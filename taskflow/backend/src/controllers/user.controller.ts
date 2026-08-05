import {Request, Response} from "express";
import asyncHandler from "express-async-handler";

import {getUserProfile, updateUserProfile, getAllUsers, getUserById} from "../services/user.service";
import AppError from "../utils/AppError";

export const profile =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {

      if (!req.user) {
       throw new AppError(
        "Unauthorized.",
        401
       );
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

export const getUserByIdController =
  asyncHandler(
    async (
      req: Request<{ id: string }>,
      res: Response
    ): Promise<void> => {

      if (!req.user) {
       throw new AppError(
        "Unauthorized.",
        401
       );
      }

      const { id } = req.params;
      const user = await getUserById(id);
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
       throw new AppError(
        "Unauthorized.",
        401
       );
      }

      const userId =
        req.user.id;

      const removeAvatar =
        req.body.removeAvatar ===
        "true";

      let avatar:
        | string
        | null
        | undefined;

      if (removeAvatar) {
        avatar = null;
      } else if (req.file) {
        avatar = `/uploads/profile-images/${req.file.filename}`;
      }

      const data = {
        name:
          req.body.name,

        username:
          req.body.username,

        bio:
          req.body.bio,

        location:
          req.body.location,

        website:
          req.body.website,

        role:
          req.body.role,

        timezone:
          req.body.timezone,

        ...(avatar !==
          undefined && {
          avatar,
        }),
      };

      const updatedUser =
        await updateUserProfile(
          userId,
          data
        );

      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    }
  );

export const getAllUsersController =
  asyncHandler(async (req, res) => {

    if (!req.user) {
     throw new AppError(
      "Unauthorized.",
      401
     );
    }

    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });

  });