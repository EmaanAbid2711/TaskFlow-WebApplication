import bcrypt from "bcrypt";
import crypto from "crypto";
import { addMinutes } from "date-fns";

import prisma from "../config/prisma";
import AppError from "../utils/AppError";
import { hashPassword } from "../utils/hashPassword";
import { blacklistToken } from "./tokenBlacklist.service";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function signupUser(data: SignupData) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("Email already exists.", 409);
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      notificationSettings: {
        create: {},
      },
    },
  });

  return user;
}

export async function loginUser(data: LoginData) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const passwordMatched = await bcrypt.compare(data.password, user.password);

  if (!passwordMatched) {
    throw new AppError("Invalid email or password.", 401);
  }

  return user;
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("No account found with this email.", 404);
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = addMinutes(new Date(), 15);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: token,
      resetPasswordExpiry: expiry,
    },
  });

  return {
    token,
    expiry,
  };
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });

  if (!user) {
    throw new AppError("Invalid reset token.", 400);
  }

  if (!user.resetPasswordExpiry || user.resetPasswordExpiry < new Date()) {
    throw new AppError("Reset token has expired.", 400);
  }

  const hashedPassword = await hashPassword(newPassword);

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    },
  });
}

export async function logoutUser(token: string) {
  await blacklistToken(token);
}