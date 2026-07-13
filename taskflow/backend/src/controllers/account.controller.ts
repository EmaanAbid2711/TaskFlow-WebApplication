import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAccount = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch account.",
    });
  }
};

export const updateEmail = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { email } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already exists.",
      });
    }

    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
        },
      });

    return res.status(200).json({
      message:
        "Email updated successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Failed to update email.",
    });
  }
};

export const updatePassword =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user?.id;

      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      const bcrypt =
        await import("bcrypt");

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Current password is incorrect.",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password:
            hashedPassword,
        },
      });

      return res.status(200).json({
        message:
          "Password updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Failed to update password.",
      });
    }
  };

  export const deleteAccount =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.id;

      const user =
        await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        message:
          "Account deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Failed to delete account.",
      });
    }
  };

  export const getSecurity = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          twoFactorEnabled: true,
        },
      });

    return res.status(200).json(user);
  } catch {
    return res.status(500).json({
      message:
        "Failed to fetch security settings.",
    });
  }
};

export const updateSecurity =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.id;

      const {
        twoFactorEnabled,
      } = req.body;

      const user =
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            twoFactorEnabled,
          },
          select: {
            twoFactorEnabled:
              true,
          },
        });

      return res.status(200).json({
        message:
          "Security settings updated.",
        data: user,
      });
    } catch {
      return res.status(500).json({
        message:
          "Failed to update security settings.",
      });
    }
  };