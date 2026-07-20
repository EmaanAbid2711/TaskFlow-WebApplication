import prisma from "../config/prisma";
import type { CreateProjectInput } from "../validations/project.validation";

export const createProject = async (
  ownerId: string,
  data: CreateProjectInput
) => {

  return prisma.project.create({

    data: {

      name: data.name,

      description: data.description,

      ownerId,

      members: {

        create: {

          userId: ownerId,

          role: "Owner",

        },

      },

    },

    include: {

      members: true,

    },

  });

};

export const getProjects = async (
  ownerId: string
) => {

  const projects = await prisma.project.findMany({

    where: {
      ownerId,
    },

    include: {
      tasks: {
        select: {
          id: true,
          status: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

  });

  return projects.map(project => {

    const totalTasks = project.tasks.length;

    const completedTasks = project.tasks.filter(
      task => task.status === "COMPLETED"
    ).length;

    const progress =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    return {

      id: project.id,

      name: project.name,

      description: project.description,

      stats: {

        totalTasks,

        completedTasks,

        progress,

      },

    };

  });

};

export const getProjectById = async (
  ownerId: string,
  projectId: string
) => {

  return prisma.project.findFirst({

    where: {

      id: projectId,

      ownerId,

    },

    include: {

      members: {

        include: {

          user: {

            select: {

              id: true,

              name: true,

              avatar: true,

            },

          },

        },

      },

      tasks: true,

    },

  });

};