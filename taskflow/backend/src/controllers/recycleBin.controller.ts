import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { getRecycleBin } from "../services/recycleBin.service";
import AppError from "../utils/AppError";

// --------------------------------------------------------------------------
// Get Recycle Bin
// --------------------------------------------------------------------------

export const getRecycleBinController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const recycleBin = await getRecycleBin(req.user.id);

    res.status(200).json({
      success: true,
      data: recycleBin,
    });
  }
);