import prisma from "../config/prisma";

export const findUserByEmail = async (
  email: string
) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,

      notificationSettings: {
        create: {},
      },
    },
  });
};

export const findUserByResetToken = async (
  token: string
) => {
  return prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });
};

export const updateResetToken = async (
  userId: string,
  token: string,
  expiry: Date
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      resetPasswordToken: token,
      resetPasswordExpiry: expiry,
    },
  });
};

export const updatePassword = async (
  userId: string,
  password: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    },
  });
};