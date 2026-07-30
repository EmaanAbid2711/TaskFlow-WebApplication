import prisma from "../config/prisma";

export const getDashboardStats = async (
  userId: string
) => {

  const totalProjects =
    await prisma.project.count({
      where: {
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

  const totalTasks =
    await prisma.task.count({
      where:{
        project:{
          OR:[
            {
              ownerId:userId,
            },
            {
              members:{
                some:{
                  userId,
                },
              },
            },
          ],
        },
      },
    });

  const completedTasks =
    await prisma.task.count({
      where:{
        status:"COMPLETED",
        project:{
          OR:[
            {
              ownerId:userId,
            },
            {
              members:{
                some:{
                  userId,
                },
              },
            },
          ],
        },
      },
    });

  const pendingTasks =
    totalTasks - completedTasks;

  const projects =
    await prisma.project.findMany({
      where:{
        OR:[
          {
            ownerId:userId,
          },
          {
            members:{
              some:{
                userId,
              },
            },
          },
        ],
      },

      include:{
        tasks:true,
      },
      orderBy:{
        createdAt:"desc",
      },
    });

  const projectProgress =
    projects.map(project=>{

      const total =
        project.tasks.length;

      const completed =
        project.tasks.filter(
          task =>
          task.status==="COMPLETED"
        ).length;

      const progress =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          );

      return {
        id:project.id,
        name:
          project.name,
        progress,
        color:"#0052cc",
      };
    });

  const recentActivities =
  await prisma.activity.findMany({
    where: {
      task: {
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
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      task: {
        include: {
          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  const upcomingTasks =
  await prisma.task.findMany({
    where: {
      dueDate: {
        not: null,
      },

      status: {
        not: "COMPLETED",
      },

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
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      dueDate: "asc",
    },

    take: 5,
  });

const today = new Date();

const upcomingDeadlines =
  upcomingTasks.map(task => {

    const due =
      task.dueDate!;

    const difference =
      Math.ceil(
        (due.getTime() -
          today.getTime()) /
          (1000 * 60 * 60 * 24)
      );

    let badgeColor:
      | "red"
      | "orange"
      | "green"
      | "gray";

    let dueText: string;

    if (difference < 0) {
      badgeColor = "red";
      dueText = "Overdue";
    }
    else if (difference === 0) {
      badgeColor = "red";
      dueText = "Today";
    }

    else if (difference === 1) {
      badgeColor = "orange";
      dueText = "Tomorrow";
    }

    else if (difference <= 3) {
      badgeColor = "orange";
      dueText = `${difference} days`;
    }

    else if (difference <= 7) {
      badgeColor = "green";
      dueText = `${difference} days`;
    }

    else {
      badgeColor = "gray";
      dueText = `${difference} days`;
    }

    return {
      id: task.id,
      title: task.title,
      project: task.project.name,
      due: dueText,
      badgeColor,
      dueDate: task.dueDate,
      projectId: task.project.id,
    };

  });

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    projectProgress,
    upcomingDeadlines,
    recentActivities: recentActivities.map(activity => ({
  id:
    activity.id,
  user:
    activity.user.name,
  avatar:
    activity.user.avatar,
  message:
    activity.message,
  project:
    activity.task.project.name,
  projectId:
    activity.task.project.id,
  taskId:
    activity.task.id,
  task:
    activity.task.title,
  type:
    activity.type,
  createdAt:
    activity.createdAt,
})),
  };
};