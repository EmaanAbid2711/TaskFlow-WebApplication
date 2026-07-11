import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const notifications =
      await prisma.notificationSettings.findUnique({
        where: {
          userId,
        },
      });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch notification settings.",
    });
  }
};

export const updateNotifications =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user!.id;

      const notifications =
        await prisma.notificationSettings.update({
          where: {
            userId,
          },
          data: req.body,
        });

      res.status(200).json({
        message:
          "Notification settings updated successfully.",
        data: notifications,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update notification settings.",
      });
    }
  };