import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  getNotificationsBar,
  getUnreadNotificationBarCount,
  markNotificationBarRead,
  markAllNotificationBarRead,
  deleteNotificationBar,
} from "../services/notificationBar.service";

export const getNotificationBarController = asyncHandler(
  async (req: Request, res: Response) => {
    const notifications = await getNotificationsBar(req.user!.id);

    res.json({
      success: true,
      data: notifications,
    });
  }
);

export const getUnreadNotificationBarCountController = asyncHandler(
  async (req: Request, res: Response) => {
    const unreadCount = await getUnreadNotificationBarCount(req.user!.id);

    res.json({
      success: true,
      data: unreadCount,
    });
  }
);

export const markNotificationBarReadController = asyncHandler(
  async (req: Request, res: Response) => {
    await markNotificationBarRead(req.user!.id, String(req.params.id));

    res.json({
      success: true,
    });
  }
);

export const markAllNotificationBarReadController = asyncHandler(
  async (_req: Request, res: Response) => {
    await markAllNotificationBarRead(_req.user!.id);

    res.json({
      success: true,
    });
  }
);

export const deleteNotificationBarController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteNotificationBar(req.user!.id, String(req.params.id));

    res.json({
      success: true,
    });
  }
);