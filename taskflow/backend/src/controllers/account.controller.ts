import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import prisma from "../config/prisma";
import AppError from "../utils/AppError";

export const getAccount = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const updateEmail = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { email } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new AppError(
        "Email already exists.",
        409
      );
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        email,
      },
    });

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
      data: user,
    });
  }
);

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError(
        "User not found.",
        404
      );
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      throw new AppError(
        "Current password is incorrect.",
        400
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully.",
    });
  }
);

  export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError(
        "User not found.",
        404
      );
    }

    await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        "Account deleted successfully.",
    });
  }
);

  export const getSecurity = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          twoFactorEnabled: true,
        },
      });

    if (!user) {
      throw new AppError(
        "User not found.",
        404
      );
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const updateSecurity =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      if (!req.user) {
        throw new AppError(
          "Unauthorized",
          401
        );
      }

      const {
        twoFactorEnabled,
      } = req.body;

      const user =
        await prisma.user.update({
          where: {
            id: req.user.id,
          },
          data: {
            twoFactorEnabled,
          },
          select: {
            twoFactorEnabled: true,
          },
        });

      res.status(200).json({
        success: true,
        message:
          "Security settings updated.",
        data: user,
      });
    }
  );