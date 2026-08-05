import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getActivities } from "../services/activity.service";
import AppError from "../utils/AppError";

export const getActivitiesController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
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