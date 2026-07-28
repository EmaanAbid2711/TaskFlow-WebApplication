import prisma from "../config/prisma";

export const getDashboardStats = async (
  userId: string
) => {

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

  const totalTasks =
    await prisma.task.count({
      where:{
        project:{
          OR:[
            {
              ownerId:userId,
            },
            {
              members:{
                some:{
                  userId,
                },
              },
            },
          ],
        },
      },
    });

  const completedTasks =
    await prisma.task.count({
      where:{
        status:"COMPLETED",
        project:{
          OR:[
            {
              ownerId:userId,
            },
            {
              members:{
                some:{
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

  const projects =
    await prisma.project.findMany({
      where:{
        OR:[
          {
            ownerId:userId,
          },
          {
            members:{
              some:{
                userId,
              },
            },
          },
        ],
      },

      include:{
        tasks:true,
      },
      orderBy:{
        createdAt:"desc",
      },
    });

  const projectProgress =
    projects.map(project=>{

      const total =
        project.tasks.length;

      const completed =
        project.tasks.filter(
          task =>
          task.status==="COMPLETED"
        ).length;

      const progress =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          );

      return {
        id:project.id,
        name:
          project.name,
        progress,
        color:"#0052cc",
      };
    });
  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    projectProgress,
  };
};