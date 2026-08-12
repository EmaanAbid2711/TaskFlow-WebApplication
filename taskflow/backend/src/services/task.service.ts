import prisma from "../config/prisma";
import fs from "fs/promises";
import path from "path";

import type {
  CreateTaskInput,
  UpdateTaskInput,
  CreateCommentInput,
} from "../validations/task.validation";

import {
  TaskStatus,
  TaskPriority,
} from "@prisma/client";

import { createNotificationBar } from "./notificationBar.service";

import {
  invalidateDashboardCacheForUsers,
} from "./cache.service";

import AppError from "../utils/AppError";

// --------------------------------------------------------------------------
// Create Activity
// --------------------------------------------------------------------------

const createActivity = async (
  userId: string,
  taskId: string,
  type: string,
  message: string
) => {
  await prisma.activity.create({
    data: {
      userId,
      taskId,
      type,
      message,
    },
  });
};

// --------------------------------------------------------------------------
// Ensure Project Member
// --------------------------------------------------------------------------

const ensureProjectMember = async (
  projectId: string,
  userId?: string | null
) => {
  if (!userId) {
    return;
  }

  const existing = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  if (existing) {
    return;
  }

  await prisma.projectMember.create({
    data: {
      projectId,
      userId,
      role: "Member",
    },
  });
};

// --------------------------------------------------------------------------
// Invalidate Task Dashboard Caches
// --------------------------------------------------------------------------

const invalidateTaskDashboardCaches = async (
  ownerId: string,
  assigneeId?: string | null,
  actorId?: string | null
) => {
  await invalidateDashboardCacheForUsers([
    ownerId,
    assigneeId,
    actorId,
  ]);
};

// --------------------------------------------------------------------------
// Create Task
// --------------------------------------------------------------------------

export const createTask = async (
  userId: string,
  data: CreateTaskInput
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: data.projectId,

      // A task cannot be created inside a deleted project.
      deletedAt: null,

      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },

    select: {
      id: true,
      ownerId: true,
    },
  });

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status as TaskStatus,
      priority: data.priority as TaskPriority,
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
      progress: data.progress,
      reviewStatus: data.reviewStatus,
      projectId: data.projectId,
      assigneeId: data.assigneeId,
    },

    include: {
      assignee: true,
      attachments: true,

      comments: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      },

      activities: true,
    },
  });

  await ensureProjectMember(
    project.id,
    task.assigneeId
  );

  let activityMessage = "Task created";

  if (task.dueDate) {
    const dueDate =
      task.dueDate.toISOString().split("T")[0];

    activityMessage =
      `Task created (Due: ${dueDate})`;
  }

  await createActivity(
    userId,
    task.id,
    "system",
    activityMessage
  );

  if (
    task.assigneeId &&
    task.assigneeId !== userId
  ) {
    await createNotificationBar(
      task.assigneeId,
      "New Task Assigned",
      `You have been assigned "${task.title}"`,
      "TASK_ASSIGNED",
      task.projectId,
      task.id
    );
  }

  await invalidateTaskDashboardCaches(
    project.ownerId,
    task.assigneeId,
    userId
  );

  return task;
};

// --------------------------------------------------------------------------
// Get All Active Tasks Of Project
// --------------------------------------------------------------------------

export const getProjectTasks = async (
  userId: string,
  projectId: string
) => {
  return prisma.task.findMany({
    where: {
      // IMPORTANT:
      // Tasks in recycle bin must not appear in
      // the normal project task list.
      deletedAt: null,

      projectId,

      project: {
        // The project itself must also be active.
        deletedAt: null,

        OR: [
          {
            ownerId: userId,
          },

          {
            tasks: {
              some: {
                assigneeId: userId,
                deletedAt: null,
              },
            },
          },
        ],
      },
    },

    include: {
      assignee: true,
      attachments: true,

      comments: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      },

      activities: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

// --------------------------------------------------------------------------
// Get Single Active Task
// --------------------------------------------------------------------------

export const getTaskById = async (
  userId: string,
  taskId: string
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,

      // A deleted task should not be returned
      // by the normal task API.
      deletedAt: null,

      project: {
        // The parent project must also be active.
        deletedAt: null,

        OR: [
          {
            ownerId: userId,
          },

          {
            tasks: {
              some: {
                assigneeId: userId,
                deletedAt: null,
              },
            },
          },
        ],
      },
    },

    include: {
      assignee: true,
      attachments: true,

      comments: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      activities: {
        include: {
          user: true,
        },
      },

      project: {
        select: {
          id: true,
          ownerId: true,
          name: true,
          deletedAt: true,
        },
      },
    },
  });

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  return task;
};

// --------------------------------------------------------------------------
// Update Task
// --------------------------------------------------------------------------

export const updateTask = async (
  userId: string,
  taskId: string,
  data: UpdateTaskInput
) => {
  /*
   * getTaskById only returns active tasks.
   *
   * Therefore deleted tasks cannot be updated.
   */
  const task = await getTaskById(
    userId,
    taskId
  );

  const activities: string[] = [];

  const previousAssigneeId =
    task.assigneeId;

  if (
    data.title !== undefined &&
    data.title !== task.title
  ) {
    activities.push("Task title updated");
  }

  if (
    data.description !== undefined &&
    data.description !== task.description
  ) {
    activities.push(
      "Task description updated"
    );
  }

  if (
    data.status &&
    data.status !== task.status
  ) {
    activities.push(
      `Status changed from ${task.status} to ${data.status}`
    );
  }

  if (
    data.priority &&
    data.priority !== task.priority
  ) {
    activities.push(
      `Priority changed from ${task.priority} to ${data.priority}`
    );
  }

  if (data.dueDate !== undefined) {
    const oldDate = task.dueDate
      ? task.dueDate
          .toISOString()
          .split("T")[0]
      : null;

    const newDate = data.dueDate
      ? new Date(data.dueDate)
          .toISOString()
          .split("T")[0]
      : null;

    if (oldDate !== newDate) {
      if (newDate) {
        activities.push(
          `Due date changed to ${newDate}`
        );
      } else {
        activities.push(
          "Due date removed"
        );
      }
    }
  }

  if (
    data.progress !== undefined &&
    data.progress !== task.progress
  ) {
    activities.push(
      `Progress updated to ${data.progress}%`
    );
  }

  if (
    data.reviewStatus !== undefined &&
    data.reviewStatus !== task.reviewStatus
  ) {
    activities.push(
      "Review status changed"
    );
  }

  if (
    data.assigneeId !== undefined &&
    data.assigneeId !== task.assigneeId
  ) {
    let assigneeName = "Unassigned";

    if (data.assigneeId) {
      const assignee =
        await prisma.user.findUnique({
          where: {
            id: data.assigneeId,
          },

          select: {
            name: true,
          },
        });

      assigneeName =
        assignee?.name ?? "Unknown User";
    }

    activities.push(
      `Assigned to ${assigneeName}`
    );

    if (data.assigneeId) {
      await createNotificationBar(
        data.assigneeId,
        "New Task Assigned",
        `You have been assigned "${task.title}"`,
        "TASK_ASSIGNED",
        task.projectId,
        task.id
      );
    }
  }

  const updatedTask =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        ...data,

        status: data.status
          ? (data.status as TaskStatus)
          : undefined,

        priority: data.priority
          ? (data.priority as TaskPriority)
          : undefined,

        dueDate:
          data.dueDate !== undefined
            ? data.dueDate
              ? new Date(data.dueDate)
              : null
            : undefined,

        completedAt:
          data.status === "COMPLETED"
            ? new Date()
            : data.status
            ? null
            : undefined,
      },

      include: {
        assignee: true,
        attachments: true,

        comments: {
          include: {
            user: true,
          },

          orderBy: {
            createdAt: "asc",
          },
        },

        activities: {
          include: {
            user: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  await ensureProjectMember(
    updatedTask.projectId,
    updatedTask.assigneeId
  );

  for (const activity of activities) {
    await createActivity(
      userId,
      task.id,
      "system",
      activity
    );
  }

  if (
    data.status === "COMPLETED"
  ) {
    await createNotificationBar(
      task.project.ownerId,
      "Task Completed",
      `"${task.title}" has been completed.`,
      "TASK_COMPLETED",
      task.projectId,
      task.id
    );
  }

  await invalidateDashboardCacheForUsers([
    task.project.ownerId,
    previousAssigneeId,
    updatedTask.assigneeId,
    userId,
  ]);

  const finalTask =
    await getTaskById(
      userId,
      taskId
    );

  return finalTask;
};

// --------------------------------------------------------------------------
// Move Task To Recycle Bin
// --------------------------------------------------------------------------

export const moveTaskToRecycleBin = async (
  userId: string,
  taskId: string
) => {
  /*
   * getTaskById ensures:
   *
   * - task exists
   * - task is active
   * - project is active
   * - user has access
   */
  const task = await getTaskById(
    userId,
    taskId
  );

  const deletedAt = new Date();

  await prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      deletedAt,
    },
  });

  await createActivity(
    userId,
    taskId,
    "system",
    "Task moved to recycle bin"
  );

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assigneeId,
    userId
  );

  return {
    success: true,
    taskId,
    deletedAt,
  };
};

// --------------------------------------------------------------------------
// Restore Task From Recycle Bin
// --------------------------------------------------------------------------

export const restoreTask = async (
  userId: string,
  taskId: string
) => {
  /*
   * We intentionally don't use getTaskById here
   * because that function only finds active tasks.
   */
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,

      deletedAt: {
        not: null,
      },

      project: {
        // The parent project must still be active.
        //
        // A task inside a deleted project should normally
        // be restored through restoreProject().
        deletedAt: null,

        OR: [
          {
            ownerId: userId,
          },

          {
            tasks: {
              some: {
                assigneeId: userId,
                deletedAt: {
                  not: null,
                },
              },
            },
          },
        ],
      },
    },

    include: {
      assignee: true,

      project: {
        select: {
          id: true,
          ownerId: true,
          name: true,
          deletedAt: true,
        },
      },
    },
  });

  if (!task) {
    throw new AppError(
      "Task not found in recycle bin",
      404
    );
  }

  await prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      deletedAt: null,
    },
  });

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assigneeId,
    userId
  );

  return {
    success: true,
    taskId,
  };
};

// --------------------------------------------------------------------------
// Permanently Delete Task
// --------------------------------------------------------------------------

export const permanentlyDeleteTask = async (
  userId: string,
  taskId: string
) => {
  /*
   * We need a separate query because getTaskById()
   * excludes deleted tasks.
   */
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,

      deletedAt: {
        not: null,
      },

      project: {
        OR: [
          {
            ownerId: userId,
          },

          {
            tasks: {
              some: {
                assigneeId: userId,
              },
            },
          },
        ],
      },
    },

    include: {
      project: {
        select: {
          ownerId: true,
        },
      },

      assignee: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!task) {
    throw new AppError(
      "Task not found in recycle bin",
      404
    );
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assignee?.id,
    userId
  );

  return {
    success: true,
    taskId,
  };
};

// --------------------------------------------------------------------------
// Legacy Delete Task
// --------------------------------------------------------------------------
//
// Keep this temporarily so existing controller imports don't
// immediately break.
//
// Phase 3 will update the controller to explicitly use
// permanentlyDeleteTask.

export const deleteTask = permanentlyDeleteTask;

// --------------------------------------------------------------------------
// Upload Task Attachment
// --------------------------------------------------------------------------

interface UploadAttachmentInput {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
}

export const uploadTaskAttachment = async (
  userId: string,
  taskId: string,
  file: UploadAttachmentInput
) => {
  const task = await getTaskById(
    userId,
    taskId
  );

  const attachment =
    await prisma.taskAttachment.create({
      data: {
        taskId,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileType: file.fileType,
        fileSize: file.fileSize,
      },
    });

  await createActivity(
    userId,
    taskId,
    "system",
    `Attachment uploaded: ${file.fileName}`
  );

  if (
    task.assignee &&
    task.assignee.id !== userId
  ) {
    await createNotificationBar(
      task.assignee.id,
      "Attachment Uploaded",
      `A new attachment was added to "${task.title}"`,
      "ATTACHMENT",
      task.projectId,
      task.id
    );
  }

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assigneeId,
    userId
  );

  return attachment;
};

// --------------------------------------------------------------------------
// Delete Task Attachment
// --------------------------------------------------------------------------

export const deleteTaskAttachment = async (
  userId: string,
  taskId: string,
  attachmentId: string
) => {
  const task = await getTaskById(
    userId,
    taskId
  );

  const attachment =
    await prisma.taskAttachment.findFirst({
      where: {
        id: attachmentId,
        taskId,
      },
    });

  if (!attachment) {
    throw new AppError(
      "Attachment not found.",
      404
    );
  }

  try {
    const filePath = path.join(
      process.env.RAILWAY_VOLUME_MOUNT_PATH ||
        "uploads",

      attachment.fileUrl.replace(
        "/uploads/",
        ""
      )
    );

    await fs.unlink(filePath);
  } catch (error) {
    console.warn(
      "Attachment file already missing:",
      attachment.fileUrl
    );
  }

  await prisma.taskAttachment.delete({
    where: {
      id: attachmentId,
    },
  });

  await createActivity(
    userId,
    taskId,
    "system",
    `Attachment deleted: ${attachment.fileName}`
  );

  if (
    task.assignee &&
    task.assignee.id !== userId
  ) {
    await createNotificationBar(
      task.assignee.id,
      "Attachment Deleted",
      `An attachment was removed from "${task.title}"`,
      "ATTACHMENT",
      task.projectId,
      task.id
    );
  }

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assigneeId,
    userId
  );

  return {
    success: true,
  };
};

// --------------------------------------------------------------------------
// Create Task Comment
// --------------------------------------------------------------------------

export const createTaskComment = async (
  userId: string,
  taskId: string,
  data: CreateCommentInput
) => {
  const task = await getTaskById(
    userId,
    taskId
  );

  const comment =
    await prisma.comment.create({
      data: {
        text: data.text,
        taskId,
        userId,
      },

      include: {
        user: true,
      },
    });

  await createActivity(
    userId,
    taskId,
    "comment",
    "Added a comment"
  );

  if (
    task.assignee &&
    task.assignee.id !== userId
  ) {
    await createNotificationBar(
      task.assignee.id,
      "New Comment",
      `Someone commented on "${task.title}"`,
      "COMMENT",
      task.projectId,
      task.id
    );
  }

  await invalidateTaskDashboardCaches(
    task.project.ownerId,
    task.assigneeId,
    userId
  );

  return comment;
};