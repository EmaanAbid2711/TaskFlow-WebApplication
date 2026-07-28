import prisma from "../config/prisma";

export const getDashboardStats = async (
  userId: string
) => {

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

      select: {
        id: true,
      },
    });

  const projectIds =
    projects.map(project => project.id);


  const totalProjects =
    projectIds.length;

  const totalTasks =
    await prisma.task.count({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });

  const completedTasks =
    await prisma.task.count({
      where: {
        projectId: {
          in: projectIds,
        },

        status: "COMPLETED",
      },
    });

  const pendingTasks =
    totalTasks -
    completedTasks;

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};