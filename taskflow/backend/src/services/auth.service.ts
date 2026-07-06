import prisma from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";

interface SignupData {
  name: string;
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
    throw new Error("Email already exists");
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