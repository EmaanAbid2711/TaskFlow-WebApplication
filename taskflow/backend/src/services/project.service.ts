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

  return prisma.project.findMany({

    where: {

      ownerId,

    },

    include: {

      tasks: true,

    },

    orderBy: {

      createdAt: "desc",

    },

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