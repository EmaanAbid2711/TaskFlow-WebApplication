import prisma from "../config/prisma";
import AppError from "../utils/AppError";

// --------------------------------------------------------------------------
// Get Recycle Bin
// --------------------------------------------------------------------------

export const getRecycleBin = async (userId: string) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  // Deleted Projects
  const deletedProjects = await prisma.project.findMany({
    where: {
      ownerId: userId,
      deletedAt: {
        not: null,
      },
    },

    select: {
      id: true,
      name: true,
      description: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,

      // Tasks deleted together with the project.
      tasks: {
        where: {
          deletedAt: {
            not: null,
          },
        },

        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          dueDate: true,
          deletedAt: true,
          assignee: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },

        orderBy: {
          deletedAt: "desc",
        },
      },
    },

    orderBy: {
      deletedAt: "desc",
    },
  });

  // ------------------------------------------------------------------------
  // Individually Deleted Tasks
  //
  // Only tasks whose parent project is still active are returned here.
  //
  // Tasks belonging to a deleted project are already included inside the
  // deleted project above, so returning them again would create duplicates.
  // ------------------------------------------------------------------------

  const deletedTasks = await prisma.task.findMany({
  where: {
    deletedAt: {
      not: null,
    },

    project: {
      deletedAt: null,

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
    id: true,
    title: true,
    description: true,
    status: true,
    priority: true,
    dueDate: true,
    deletedAt: true,

    project: {
      select: {
        id: true,
        name: true,
      },
    },

    assignee: {
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    },
  },

  orderBy: {
    deletedAt: "desc",
  },
});

  return {
    projects: deletedProjects,
    tasks: deletedTasks,
  };
};