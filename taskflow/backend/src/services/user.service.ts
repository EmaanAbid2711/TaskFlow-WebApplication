import prisma from "../config/prisma";

export const getUserProfile =
async (
  userId: string
) => {

  return await prisma.user.findUnique({

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

interface UpdateUserProfileData {
  name?: string;
  avatar?: string;
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

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...data,
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