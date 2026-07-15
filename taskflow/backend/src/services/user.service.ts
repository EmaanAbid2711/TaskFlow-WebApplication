import fs from "fs";
import path from "path";

import prisma from "../config/prisma";

export const getUserProfile =
  async (
    userId: string
  ) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        role: true,
        timezone: true,
      },
    });
  };

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      role: true,
    },
  });
};

interface UpdateUserProfileData {
  name?: string;
  avatar?: string | null;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  role?: string;
  timezone?: string;
}

export const updateUserProfile =
  async (
    userId: string,
    data: UpdateUserProfileData
  ) => {
    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          avatar: true,
        },
      });

    /*
     * User removed avatar.
     * Delete the old image from disk.
     */
    if (
      data.avatar === null &&
      existingUser?.avatar
    ) {
      const imagePath =
        path.join(
          process.cwd(),
          existingUser.avatar.replace(
            /^\/+/,
            ""
          )
        );

      if (
        fs.existsSync(imagePath)
      ) {
        fs.unlinkSync(imagePath);
      }
    }

    /*
     * User uploaded a new avatar.
     * Delete the previous image.
     */
    if (
      typeof data.avatar ===
        "string" &&
      existingUser?.avatar
    ) {
      const oldImagePath =
        path.join(
          process.cwd(),
          existingUser.avatar.replace(
            /^\/+/,
            ""
          )
        );

      if (
        fs.existsSync(
          oldImagePath
        )
      ) {
        fs.unlinkSync(
          oldImagePath
        );
      }
    }

    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        role: true,
        timezone: true,
      },
    });
  };