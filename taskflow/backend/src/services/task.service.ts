import prisma from "../config/prisma";
import fs from "fs/promises";
import path from "path";

import type { CreateTaskInput, UpdateTaskInput, CreateCommentInput} from "../validations/task.validation";
import {TaskStatus, TaskPriority, Prisma} from "@prisma/client";
import { createNotificationBar } from "./notificationBar.service";


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

const ensureProjectMember = async (
  projectId: string,
  userId?: string | null
) => {
  if (!userId) {
    return;
  }
  const existing =
    await prisma.projectMember.findUnique({
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

export const createTask = async (
  userId: string,
  data: CreateTaskInput
) => {

  const project =
    await prisma.project.findFirst({

      where: {
        id: data.projectId,

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

    });

  if (!project) {

    throw new Error(
      "Project not found."
    );

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
  await createActivity(
  userId,
  task.id,
  "system",
  "Task created"
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

return task;

};

// Get All Tasks Of Project

export const getProjectTasks =
async (
  userId: string,
  projectId: string
) => {

  return prisma.task.findMany({

    where: {

      projectId,

      project: {

        OR: [
          {
            ownerId: userId,
          },
          {
            tasks: {
              some: {
                assigneeId : userId,
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

      activities:{
        include:{
          user:true
        },
        orderBy:{
          createdAt:"desc"
        }
      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};

// Get Single Task

export const getTaskById =
async (
  userId: string,
  taskId: string
) => {

  return prisma.task.findFirst({

    where: {

      id: taskId,

      project: {

        OR: [
          {
            ownerId: userId,
          },
          {
            tasks: {
              some: {
                assigneeId:userId,
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
        orderBy:{
          createdAt:"desc"
        }
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
        },
      },

    },

  });

};



// Update Task
export const updateTask = async (
  userId: string,
  taskId: string,
  data: UpdateTaskInput
) => {

  const task =
    await getTaskById(
      userId,
      taskId
    );

  if (!task) {
    throw new Error("Task not found.");
  }

  const activities: string[] = [];

/*
|--------------------------------------------------------------------------
| Compare Title
|--------------------------------------------------------------------------
*/

if (
  data.title !== undefined &&
  data.title !== task.title
) {
  activities.push("Task title updated");
}

/*
|--------------------------------------------------------------------------
| Compare Description
|--------------------------------------------------------------------------
*/

if (
  data.description !== undefined &&
  data.description !== task.description
) {
  activities.push("Task description updated");
}

/*
|--------------------------------------------------------------------------
| Compare Status
|--------------------------------------------------------------------------
*/

if (
  data.status &&
  data.status !== task.status
) {
  activities.push(
    `Status changed from ${task.status} to ${data.status}`
  );
}

/*
|--------------------------------------------------------------------------
| Compare Priority
|--------------------------------------------------------------------------
*/

if (
  data.priority &&
  data.priority !== task.priority
) {
  activities.push(
    `Priority changed from ${task.priority} to ${data.priority}`
  );
}

/*
|--------------------------------------------------------------------------
| Compare Due Date
|--------------------------------------------------------------------------
*/

if (
  data.dueDate !== undefined
) {

  const oldDate =
    task.dueDate
      ?.toISOString()
      .split("T")[0];

  const newDate =
    data.dueDate;

  if (oldDate !== newDate) {

    activities.push(
      `Due date changed to ${newDate}`
    );

  }

}

/*
|--------------------------------------------------------------------------
| Compare Progress
|--------------------------------------------------------------------------
*/

if (
  data.progress !== undefined &&
  data.progress !== task.progress
) {

  activities.push(
    `Progress updated to ${data.progress}%`
  );

}

/*
|--------------------------------------------------------------------------
| Compare Review Status
|--------------------------------------------------------------------------
*/

if (
  data.reviewStatus !== undefined &&
  data.reviewStatus !== task.reviewStatus
) {

  activities.push(
    `Review status changed`
  );

}

/*
|--------------------------------------------------------------------------
| Compare Assignee
|--------------------------------------------------------------------------
*/

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
      assignee?.name ??
      "Unknown User";

  }

  activities.push(
    `Assigned to ${assigneeName}`
  );

  if (
  data.assigneeId &&
  data.assigneeId !== task.assigneeId
) {

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

  //------------------------------------------------------------------
  // Return updated task with relations
  //------------------------------------------------------------------

  const updatedTask =
  await prisma.task.update({

    where: {
      id: taskId,
    },

    data: {

  ...data,

  status:
    data.status as TaskStatus,

  priority:
    data.priority as TaskPriority,

  dueDate:
    data.dueDate
      ? new Date(data.dueDate)
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

      activities:{
        include:{
          user:true
        },
        orderBy:{
          createdAt:"desc"
        }
      }

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

const finalTask =
await getTaskById(
  userId,
  taskId
);

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


return finalTask;

};

// Delete Task
export const deleteTask =
async (
  userId: string,
  taskId: string
) => {

  const task =
    await getTaskById(
      userId,
      taskId
    );

  if (!task) {

    throw new Error(
      "Task not found."
    );

  }

  await prisma.task.delete({

    where: {
      id: taskId,
    },

  });

};

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
// Verify task exists and user has access

  const task = await getTaskById(
    userId,
    taskId
  );

  if (!task) {
    throw new Error("Task not found.");
  }

  // Save attachment
 
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

  return attachment;

};

export const deleteTaskAttachment = async (
  userId: string,
  taskId: string,
  attachmentId: string
) => {

  // Verify task access
  const task = await getTaskById(
    userId,
    taskId
  );

  if (!task) {
    throw new Error("Task not found.");
  }

  // Find attachment
  const attachment =
    await prisma.taskAttachment.findFirst({

      where: {
        id: attachmentId,
        taskId,
      },

    });

  if (!attachment) {
    throw new Error("Attachment not found.");
  }

  //----------------------------------------------------
  // Delete physical file
  //----------------------------------------------------

  try {

    const filePath = path.join(
      process.env.RAILWAY_VOLUME_MOUNT_PATH || "uploads",
      attachment.fileUrl.replace("/uploads/", "")
    );

    await fs.unlink(filePath);

  } catch (error) {

    console.warn(
      "Attachment file already missing:",
      attachment.fileUrl
    );

  }

  //----------------------------------------------------
  // Delete database record
  //----------------------------------------------------

  await prisma.taskAttachment.delete({

    where: {
      id: attachmentId,
    },

  });

  //----------------------------------------------------
  // Activity
  //----------------------------------------------------

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

  return {
    success: true,
  };

};

export const createTaskComment = async (
  userId: string,
  taskId: string,
  data: CreateCommentInput
) => {

  const task =
    await getTaskById(
      userId,
      taskId
    );

  if (!task) {
    throw new Error("Task not found.");
  }

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

  return comment;

};