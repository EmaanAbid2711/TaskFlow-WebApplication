import prisma from "../config/prisma";
import AppError from "../utils/AppError";

export const getActivities = async (
  userId: string,
  page: number,
  limit: number
) => {

  const user = await prisma.user.findUnique({
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

  const skip = (page - 1) * limit;

  const where = {
    task: {
      project: {
        OR: [
          { ownerId: userId },
          {
            members: {
              some: { userId },
            },
          },
        ],
      },
    },
  };

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where,
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
      skip,
      take: limit,
    }),
    prisma.activity.count({
      where,
    }),
  ]);

  return {
    activities: activities.map((activity) => ({
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
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrevious: page > 1,
    },
  };
};