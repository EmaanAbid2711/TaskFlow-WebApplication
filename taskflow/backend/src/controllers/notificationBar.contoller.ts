import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getNotificationsBar = async (req: Request, res: Response) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: req.user!.id
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 20
  });

  res.json({
    success: true,
    data: notifications
  });
};

export const markNotificationBarRead = async (req: Request, res: Response) => {
  await prisma.notification.update({
    where: {
      id: String(req.params.id)
    },
    data: {
      isRead: true
    }
  });

  res.json({
    success: true
  });
};