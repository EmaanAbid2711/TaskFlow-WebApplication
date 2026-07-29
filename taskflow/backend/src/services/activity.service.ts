import prisma from "../config/prisma";

export const getActivities = async (
  userId: string
) => {

  const activities =
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

          select: {

            id: true,

            title: true,

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

    });

  return activities.map(activity => ({

    id: activity.id,

    type: activity.type,

    message: activity.message,

    createdAt: activity.createdAt,

    user: {

      id: activity.user.id,

      name: activity.user.name,

      avatar: activity.user.avatar,

    },

    task: {

      id: activity.task.id,

      title: activity.task.title,

    },

    project: {

      id: activity.task.project.id,

      name: activity.task.project.name,

    },

  }));

};