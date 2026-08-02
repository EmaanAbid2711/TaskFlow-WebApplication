import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getActivities } from "../services/activity.service";

export const getActivitiesController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getActivities(req.user.id, page, limit);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);