import bcrypt from "bcrypt";
import crypto from "crypto";
import { addMinutes } from "date-fns";

import AppError from "../utils/AppError";
import { hashPassword } from "../utils/hashPassword";
import { blacklistToken } from "./tokenBlacklist.service";
import { findUserByEmail, createUser, findUserByResetToken, updateResetToken, updatePassword} from "../repositories/auth.repository";
import type {SignupInput, LoginInput} from "../validations/auth.validation";

//--------------------------------------------------
// Signup
//--------------------------------------------------

export async function signupUser(
  data: SignupInput
) {
  const existingUser =
    await findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError(
      "Email already exists.",
      409
    );
  }

  const hashedPassword =
    await hashPassword(data.password);

  const user =
    await createUser(
      data.name,
      data.email,
      hashedPassword
    );

  return user;
}

//--------------------------------------------------
// Login
//--------------------------------------------------

export async function loginUser(
  data: LoginInput
) {
  const user =
    await findUserByEmail(data.email);

  if (!user) {
    throw new AppError(
      "Invalid email or password.",
      401
    );
  }

  const passwordMatched =
    await bcrypt.compare(
      data.password,
      user.password
    );

  if (!passwordMatched) {
    throw new AppError(
      "Invalid email or password.",
      401
    );
  }

  return user;
}

//--------------------------------------------------
// Forgot Password
//--------------------------------------------------

export async function forgotPassword(
  email: string
) {
  const user =
    await findUserByEmail(email);

  if (!user) {
    throw new AppError(
      "No account found with this email.",
      404
    );
  }

  const token =
    crypto.randomBytes(32).toString("hex");

  const expiry =
    addMinutes(
      new Date(),
      15
    );

  await updateResetToken(
    user.id,
    token,
    expiry
  );

  return {
    token,
    expiry,
  };
}

//--------------------------------------------------
// Reset Password
//--------------------------------------------------

export async function resetPassword(
  token: string,
  newPassword: string
) {
  const user =
    await findUserByResetToken(token);

  if (!user) {
    throw new AppError(
      "Invalid reset token.",
      400
    );
  }

  if (
    !user.resetPasswordExpiry ||
    user.resetPasswordExpiry < new Date()
  ) {
    throw new AppError(
      "Reset token has expired.",
      400
    );
  }

  const hashedPassword =
    await hashPassword(newPassword);

  return updatePassword(
    user.id,
    hashedPassword
  );
}

//--------------------------------------------------
// Logout
//--------------------------------------------------

export async function logoutUser(
  token: string
) {
  await blacklistToken(token);
}