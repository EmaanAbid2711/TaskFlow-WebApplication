import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import AppError from "../utils/AppError";
import prisma from "../config/prisma";

export const getNotifications = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(
        "Unauthorized",
        401
      );
    }

    const notifications =
      await prisma.notificationSettings.findUnique({
        where: {
          userId,
        },
      });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  }
);

export const updateNotifications = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(
        "Unauthorized",
        401
      );
    }

    const notifications =
      await prisma.notificationSettings.update({
        where: {
          userId,
        },
        data: req.body,
      });

    res.status(200).json({
      success: true,
      message:
        "Notification settings updated successfully.",
      data: notifications,
    });
  }
);