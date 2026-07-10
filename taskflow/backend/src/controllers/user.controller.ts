import {Request, Response} from "express";
import asyncHandler from "express-async-handler";

import {getUserProfile, updateUserProfile} from "../services/user.service";
import {updateProfileSchema} from "../validations/user.validation";

export const profile =
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

      const userId = req.user.id;
      const user =
        await getUserProfile(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    }
  );

export const updateProfile =
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

      const userId = req.user.id;

      const data =
        updateProfileSchema.parse(
          req.body
        );

      const user =
        await updateUserProfile(
          userId,
          data
        );

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully.",
        data: user,
      });
    }
  );