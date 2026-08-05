import prisma from "../config/prisma";
import type {CreateProjectInput, UpdateProjectInput} from "../validations/project.validation";
import AppError from "../utils/AppError";


async function buildProjectResponse(projectId: string) {
  const project = await prisma.project.findUnique({
  where: {
    id: projectId,
  },
  include: {
    tasks: {
      select: {
        id: true,
        status: true,
      },
    },
    owner: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

  if (!project) {
    return null;
  }

  const totalTasks = project.tasks.length;

  const completedTasks = project.tasks.filter(
    (task) => task.status === "COMPLETED"
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
    owner: project.owner,
    stats: {
      totalTasks,
      completedTasks,
      progress,
    },
  };
}

// Create Project

export const createProject = async (
  ownerId: string,
  data: CreateProjectInput
) => {
  const project = await prisma.project.create({
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
  });

  return buildProjectResponse(project.id);
};

// Get Projects

export const getProjects = async (
  userId: string
) => {
  const projects = await prisma.project.findMany({
    where: {

      OR: [
        // User created the project
        {
          ownerId: userId,
        },
        // OR user has at least one assigned task
        {
          tasks: {
            some: {
              assigneeId: userId,
            },
          },
        },
      ],

    },

    select: {
      id: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
  return Promise.all(
    projects.map((project) =>
      buildProjectResponse(project.id)
    )
  );
};

// Get Single Project
export const getProjectById = async (
  userId: string,
  projectId: string
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        {
          ownerId: userId,
        },
        {
          tasks:{
            some:{
              assigneeId:userId
            },
          },
        },
      ],
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
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return project;
};

// Update Project

export const updateProject = async (
  ownerId: string,
  projectId: string,
  data: UpdateProjectInput
) => {
  const project =
    await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId,
      },
    });

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },

    data,
  });

  return buildProjectResponse(projectId);
};

// Delete Project

export const deleteProject = async (
  ownerId: string,
  projectId: string
) => {
  const project =
    await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId,
      },
    });

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  return {
    success: true,
  };
};