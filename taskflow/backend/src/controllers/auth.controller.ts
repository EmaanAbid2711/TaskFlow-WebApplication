import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { signupSchema, loginSchema } from "../validations/auth.validation";
import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/AppError";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const data = signupSchema.parse(req.body);

  const user = await signupUser(data);

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await loginUser(data);

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    },
  });
});

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required.", 400);
    }

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: "Password reset token generated successfully.",
      data: {
        token: result.token,
        expiresAt: result.expiry,
      },
    });
  }
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = String(req.params.token);
    const { password } = req.body;

    if (!password) {
      throw new AppError("Password is required.", 400);
    }

    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters.", 400);
    }

    await resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  }
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authorization token missing.", 401);
    }

    const token = authHeader.split(" ")[1];
    await logoutUser(token);
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  }
);