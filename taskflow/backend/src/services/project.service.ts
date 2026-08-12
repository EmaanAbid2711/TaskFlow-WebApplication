import prisma from "../config/prisma";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validations/project.validation";

import AppError from "../utils/AppError";

import {
  invalidateDashboardCache,
  invalidateDashboardCacheForUsers,
} from "./cache.service";

// --------------------------------------------------------------------------
// Build Project Response
// --------------------------------------------------------------------------

const buildProjectResponse = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      tasks: {
        where: {
          deletedAt: null,
        },
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

  if (!project || project.deletedAt !== null) {
    return null;
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

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
};

// --------------------------------------------------------------------------
// Create Project
// --------------------------------------------------------------------------

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

  // Invalidate owner's dashboard cache because total project count has changed.
  await invalidateDashboardCache(ownerId);

  return buildProjectResponse(project.id);
};

// --------------------------------------------------------------------------
// Get All Active Projects
// --------------------------------------------------------------------------

export const getProjects = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      // IMPORTANT: Recycle-bin projects must not appear in the normal project list.
      deletedAt: null,
      OR: [
        // User owns the project
        {
          ownerId: userId,
        },
        // User has an active assigned task
        {
          tasks: {
            some: {
              assigneeId: userId,
              deletedAt: null,
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
    projects.map((project) => buildProjectResponse(project.id))
  );
};

// --------------------------------------------------------------------------
// Get Single Active Project
// --------------------------------------------------------------------------

export const getProjectById = async (
  userId: string,
  projectId: string
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      // Do not allow normal access to deleted projects.
      deletedAt: null,
      OR: [
        {
          ownerId: userId,
        },
        {
          tasks: {
            some: {
              assigneeId: userId,
              deletedAt: null,
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
      // Only active tasks should be returned.
      tasks: {
        where: {
          deletedAt: null,
        },
        include: {
          assignee: true,
          attachments: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          activities: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

// --------------------------------------------------------------------------
// Update Project
// --------------------------------------------------------------------------

export const updateProject = async (
  ownerId: string,
  projectId: string,
  data: UpdateProjectInput
) => {
  // Only an active project can be updated.
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });

  // Invalidate owner's dashboard cache because project data may have changed.
  await invalidateDashboardCache(ownerId);

  return buildProjectResponse(projectId);
};

// --------------------------------------------------------------------------
// Move Project To Recycle Bin
// --------------------------------------------------------------------------

export const moveProjectToRecycleBin = async (
  ownerId: string,
  projectId: string
) => {
  // Only the owner can move the project to the recycle bin.
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
      deletedAt: null,
    },
    include: {
      tasks: {
        select: {
          id: true,
          assigneeId: true,
          deletedAt: true,
        },
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  /*
   * IMPORTANT:
   * We use one timestamp for the project and all currently active tasks inside the project.
   * This allows restoreProject() to know which tasks were deleted because of this project deletion.
   */
  const deletedAt = new Date();

  const affectedUserIds = [
    ownerId,
    ...project.tasks
      .filter((task) => task.deletedAt === null)
      .map((task) => task.assigneeId),
  ];

  await prisma.$transaction([
    // Soft delete the project
    prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        deletedAt,
      },
    }),
    // Soft delete only tasks that are currently active.
    // Already-deleted tasks keep their original deletedAt.
    prisma.task.updateMany({
      where: {
        projectId,
        deletedAt: null,
      },
      data: {
        deletedAt,
      },
    }),
  ]);

  await invalidateDashboardCacheForUsers(affectedUserIds);

  return {
    success: true,
    projectId,
    deletedAt,
  };
};

// --------------------------------------------------------------------------
// Restore Project From Recycle Bin
// --------------------------------------------------------------------------

export const restoreProject = async (
  ownerId: string,
  projectId: string
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
      // We only restore projects that are actually inside the recycle bin.
      deletedAt: {
        not: null,
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found in recycle bin", 404);
  }

  const deletedAt = project.deletedAt;

  if (!deletedAt) {
    throw new AppError("Project is not in recycle bin", 400);
  }

  await prisma.$transaction([
    // Restore project
    prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        deletedAt: null,
      },
    }),
    /*
     * Restore only tasks that were deleted at exactly the same time as the project.
     * This prevents independently deleted tasks from being restored accidentally.
     */
    prisma.task.updateMany({
      where: {
        projectId,
        deletedAt,
      },
      data: {
        deletedAt: null,
      },
    }),
  ]);

  await invalidateDashboardCache(ownerId);

  return buildProjectResponse(projectId);
};

// --------------------------------------------------------------------------
// Permanently Delete Project
// --------------------------------------------------------------------------

export const permanentlyDeleteProject = async (
  ownerId: string,
  projectId: string
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
      // Permanent deletion should only be possible for something already in the recycle bin.
      deletedAt: {
        not: null,
      },
    },
    include: {
      tasks: {
        select: {
          assigneeId: true,
        },
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found in recycle bin", 404);
  }

  const affectedUserIds = [
    ownerId,
    ...project.tasks.map((task) => task.assigneeId),
  ];

  /*
   * Project -> Task uses onDelete: Cascade.
   * Therefore permanently deleting the project will also permanently delete
   * its related tasks and their dependent records according to the Prisma relations.
   */
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  await invalidateDashboardCacheForUsers(affectedUserIds);

  return {
    success: true,
    projectId,
  };
};

export const deleteProject = permanentlyDeleteProject;