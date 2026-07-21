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

    },

    include: {  
    assignee: true,
    attachments: true,
    comments: true,
    activities: true,
    },

  });
  await createActivity(
  userId,
  task.id,
  "system",
  "Task created"
);

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

for (const activity of activities) {

  await createActivity(
    userId,
    task.id,
    "system",
    activity
  );

}

return updatedTask;

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