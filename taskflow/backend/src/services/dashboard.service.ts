import prisma from "../config/prisma";

export const getDashboardStats = async (
  userId: string
) => {
  /*
   * Right now there is no Project or Task backend.
   * Therefore these values will naturally be 0.
   * Later these queries will be replaced with Prisma counts.
   */

  const totalProjects = 0;
  const totalTasks = 0;
  const completedTasks = 0;
  const pendingTasks = 0;

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};