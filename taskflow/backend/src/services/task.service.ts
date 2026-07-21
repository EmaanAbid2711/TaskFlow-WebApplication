import prisma from "../config/prisma";

import type { CreateTaskInput, UpdateTaskInput} from "../validations/task.validation";
import {TaskStatus, TaskPriority} from "@prisma/client";

const statusMap: Record<string, TaskStatus> = {
  todo: TaskStatus.TODO,
  progress: TaskStatus.PROGRESS,
  review: TaskStatus.REVIEW,
  completed: TaskStatus.COMPLETED,
};

const priorityMap: Record<string, TaskPriority> = {
  High: TaskPriority.HIGH,
  Medium: TaskPriority.MEDIUM,
  Low: TaskPriority.LOW,
};

async function createActivity(
  userId: string,
  taskId: string,
  type: string,
  message: string
) {
  await prisma.activity.create({
    data: {
      userId,
      taskId,
      type,
      message,
    },
  });
}

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
      status: statusMap[data.status],
      priority: priorityMap[data.priority],
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
      progress: data.progress,
      reviewStatus: data.reviewStatus,
      projectId: data.projectId,
      assigneeId: data.assigneeId,

    }

  });
  await createActivity(
  userId,
  task.id,
  "system",
  "Task created"
);

return prisma.task.findUnique({

  where:{
    id:task.id
  },

  include:{

    assignee:true,

    attachments:true,

    comments:true,

    activities:{
      include:{
        user:true
      },
      orderBy:{
        createdAt:"desc"
      }
    }

  }

});

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
            members: {
              some: {
                userId,
              },
            },
          },
        ],

      },

    },

    include: {

      assignee: true,

      attachments: true,

      comments: true,

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
            members: {
              some: {
                userId,
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

  //------------------------------------------------------------------
  // Build update payload
  //------------------------------------------------------------------

  const updateData = {

    ...data,

    status:
      data.status
        ? statusMap[data.status]
        : undefined,

    priority:
      data.priority
        ? priorityMap[data.priority]
        : undefined,

    dueDate:
      data.dueDate
        ? new Date(data.dueDate)
        : undefined,

  };

  //------------------------------------------------------------------
  // Save task
  //------------------------------------------------------------------

  const updatedTask =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: updateData,

    });

  //------------------------------------------------------------------
  // Activity Timeline
  //------------------------------------------------------------------

  const activities: {
    type: string;
    message: string;
    taskId: string;
    userId: string;
  }[] = [];

  // Title
  if (
    data.title !== undefined &&
    data.title !== task.title
  ) {
    activities.push({
      type: "system",
      message: `Task title changed to "${data.title}"`,
      taskId,
      userId,
    });
  }

  // Description
  if (
    data.description !== undefined &&
    data.description !== task.description
  ) {
    activities.push({
      type: "system",
      message: "Task description updated",
      taskId,
      userId,
    });
  }

  // Status
  if (
    data.status !== undefined &&
    statusMap[data.status] !== task.status
  ) {
    activities.push({
      type: "system",
      message: `Status changed from ${task.status} to ${statusMap[data.status]}`,
      taskId,
      userId,
    });
  }

  // Priority
  if (
    data.priority !== undefined &&
    priorityMap[data.priority] !== task.priority
  ) {
    activities.push({
      type: "system",
      message: `Priority changed from ${task.priority} to ${priorityMap[data.priority]}`,
      taskId,
      userId,
    });
  }

  // Due Date
  if (
    data.dueDate !== undefined
  ) {

    const oldDate =
      task.dueDate
        ? task.dueDate.toISOString().slice(0, 10)
        : "";

    const newDate =
      data.dueDate;

    if (oldDate !== newDate) {

      activities.push({

        type: "system",

        message:
          newDate === ""
            ? "Due date removed"
            : `Due date changed to ${newDate}`,

        taskId,

        userId,

      });

    }

  }

  // Progress
  if (
    data.progress !== undefined &&
    data.progress !== task.progress
  ) {
    activities.push({
      type: "system",
      message: `Progress updated to ${data.progress}%`,
      taskId,
      userId,
    });
  }

  // Review Status
  if (
    data.reviewStatus !== undefined &&
    data.reviewStatus !== task.reviewStatus
  ) {
    activities.push({
      type: "system",
      message: `Review status changed to "${data.reviewStatus}"`,
      taskId,
      userId,
    });
  }

  // Assignee
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

    activities.push({

      type: "system",

      message:
        data.assigneeId
          ? `Assigned to ${assigneeName}`
          : "Task unassigned",

      taskId,

      userId,

    });

  }

  //------------------------------------------------------------------
  // Save activities
  //------------------------------------------------------------------

  if (activities.length > 0) {

    await prisma.activity.createMany({

      data: activities,

    });

  }

  //------------------------------------------------------------------
  // Return updated task with relations
  //------------------------------------------------------------------

  return prisma.task.findUnique({

    where: {
      id: taskId,
    },

    include: {

      assignee: true,

      attachments: true,

      comments: true,

      activities: {

        include: {

          user: true,

        },

        orderBy: {

          createdAt: "asc",

        },

      },

    },

  });

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