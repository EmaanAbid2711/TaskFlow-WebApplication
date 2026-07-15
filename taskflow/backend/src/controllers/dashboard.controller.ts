import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { getDashboardStats } from "../services/dashboard.service";

export const dashboardStats =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });

        return;
      }

      const stats =
        await getDashboardStats(
          req.user.id
        );

      res.status(200).json({
        success: true,
        data: stats,
      });
    }
  );