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

  return prisma.task.create({

    data: {

      title: data.title,

      description:
        data.description,

      status:
        statusMap[data.status],

      priority:
        priorityMap[data.priority],

      dueDate:
        data.dueDate
          ? new Date(data.dueDate)
          : null,

      progress:
        data.progress,

      reviewStatus:
        data.reviewStatus,

      projectId:
        data.projectId,

      assigneeId:
        data.assigneeId,

    },

    include: {

      assignee: true,

      attachments: true,

      comments: true,

      activities: true,

    },

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

      activities: true,

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
export const updateTask =
async (
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

    throw new Error(
      "Task not found."
    );

  }

  return prisma.task.update({

    where: {
      id: taskId,
    },

    data: {

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

    },

    include: {

      assignee: true,

      attachments: true,

      comments: true,

      activities: true,

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