import prisma from "../config/prisma";


export const createNotificationBar = async (
  userId:string,
  title:string,
  message:string,
  type:string,
  projectId?:string,
  taskId?:string
)=>{


return prisma.notification.create({

data:{
    userId,
    title,
    message,
    type,
    projectId,
    taskId
}

});


};