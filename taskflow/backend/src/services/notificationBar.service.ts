import prisma from "../config/prisma";

export const createNotificationBar = async (
  userId: string,
  title: string,
  message: string,
  type: string,
  projectId?: string,
  taskId?: string
) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
      projectId,
      taskId,
    },
  });
};

export const getNotificationsBar = async (userId: string) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
};

export const getUnreadNotificationBarCount = async (userId: string) => {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
};

export const markNotificationBarRead = async (
  userId: string,
  notificationId: string
) => {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      isRead: true,
    },
  });
};

export const markAllNotificationBarRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const deleteNotificationBar = async (
  userId: string,
  notificationId: string
) => {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId,
    },
  });
};