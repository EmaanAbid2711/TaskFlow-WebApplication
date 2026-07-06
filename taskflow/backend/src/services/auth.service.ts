import bcrypt from "bcrypt";

import prisma from "../config/prisma";
import AppError from "../utils/AppError";
import { hashPassword } from "../utils/hashPassword";

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
    throw new AppError(
      "Email already exists",
      409
    );
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
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
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const passwordMatched = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatched) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  return user;
}