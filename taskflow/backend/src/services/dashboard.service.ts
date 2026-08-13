import prisma from "../config/prisma";
import redis from "../config/redis";
import AppError from "../utils/AppError";

const DASHBOARD_CACHE_TTL = 60 * 5;

const getDashboardCacheKey = (
  userId: string
) => {
  return `dashboard:stats:${userId}`;
};

export const getDashboardStats = async (
  userId: string
) => {
  const cacheKey =
    getDashboardCacheKey(userId);

  /*
  |--------------------------------------------------------------------------
  | Check Redis Cache
  |--------------------------------------------------------------------------
  */

  const cachedStats =
    await redis.get(cacheKey);

  if (cachedStats) {
    return cachedStats;
  }

  /*
  |--------------------------------------------------------------------------
  | Validate User
  |--------------------------------------------------------------------------
  */

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

  if (!user) {
    throw new AppError(
      "User not found.",
      404
    );
  }

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

  /*
  |--------------------------------------------------------------------------
  | Total Tasks
  |--------------------------------------------------------------------------
  */

  const totalTasks =
  await prisma.task.count({
    where: {
      deletedAt: null,

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
  });

  /*
  |--------------------------------------------------------------------------
  | Completed Tasks
  |--------------------------------------------------------------------------
  */

  const completedTasks =
  await prisma.task.count({
    where: {
      deletedAt: null,
      status: "COMPLETED",

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
  });

  const pendingTasks =
    totalTasks - completedTasks;

  /*
  |--------------------------------------------------------------------------
  | Project Progress
  |--------------------------------------------------------------------------
  */

  const projects =
  await prisma.project.findMany({
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

    include: {
      tasks: {
        where: {
          deletedAt: null,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const projectProgress =
    projects.map(project => {
      const total =
        project.tasks.length;

      const completed =
        project.tasks.filter(
          task =>
            task.status ===
            "COMPLETED"
        ).length;

      const progress =
        total === 0
          ? 0
          : Math.round(
              (completed / total) *
              100
            );

      return {
        id: project.id,
        name: project.name,
        progress,
        color: "#0052cc",
      };
    });

  /*
  |--------------------------------------------------------------------------
  | Recent Activities
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Upcoming Deadlines
  |--------------------------------------------------------------------------
  */

  const upcomingTasks =
    await prisma.task.findMany({
      where: {
        deletedAt: null,
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
          (
            due.getTime() -
            today.getTime()
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )
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
      } else if (
        difference === 0
      ) {
        badgeColor = "red";
        dueText = "Today";
      } else if (
        difference === 1
      ) {
        badgeColor = "orange";
        dueText = "Tomorrow";
      } else if (
        difference <= 3
      ) {
        badgeColor = "orange";
        dueText =
          `${difference} days`;
      } else if (
        difference <= 7
      ) {
        badgeColor = "green";
        dueText =
          `${difference} days`;
      } else {
        badgeColor = "gray";
        dueText =
          `${difference} days`;
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

  /*
  |--------------------------------------------------------------------------
  | Task Completion Trend
  |--------------------------------------------------------------------------
  */

  const completedTasksTrend =
    await prisma.task.findMany({
      where: {
        deletedAt: null,
        status: "COMPLETED",

        completedAt: {
          not: null,
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

      select: {
        completedAt: true,
      },

      orderBy: {
        completedAt: "asc",
      },
    });

  const trendMap =
    new Map<
      string,
      number
    >();

  completedTasksTrend.forEach(
    task => {
      const date =
        task.completedAt!
          .toISOString()
          .split("T")[0];

      trendMap.set(
        date,
        (
          trendMap.get(date) ??
          0
        ) + 1
      );
    }
  );

  const taskCompletionTrend =
    Array.from(
      trendMap.entries()
    ).map(
      ([date, completed]) => ({
        date,
        completed,
      })
    );

  /*
  |--------------------------------------------------------------------------
  | Final Dashboard Data
  |--------------------------------------------------------------------------
  */

  const dashboardStats = {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    projectProgress,
    upcomingDeadlines,
    taskCompletionTrend,

    recentActivities:
      recentActivities.map(
        activity => ({
          id: activity.id,

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
        })
      ),
  };

  /*
  |--------------------------------------------------------------------------
  | Store In Redis
  |--------------------------------------------------------------------------
  */

  await redis.set(
    cacheKey,
    dashboardStats,
    {
      ex:
        DASHBOARD_CACHE_TTL,
    }
  );

  return dashboardStats;
};