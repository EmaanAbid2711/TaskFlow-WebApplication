import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {signupSchema, loginSchema} from "../validations/auth.validation";
import {signupUser, loginUser, forgotPassword, resetPassword, logoutUser} from "../services/auth.service";
import { generateToken } from "../utils/generateToken";

export const signup = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = signupSchema.parse(req.body);

    const user = await signupUser(data);

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.status(201).json({
      success: true,
      message:
        "Account created successfully.",
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
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = loginSchema.parse(req.body);

    const user = await loginUser(data);

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message:
        "Login successful.",
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
  }
);

export const forgotPasswordController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          message: "Email is required.",
        });
        return;
      }

      const result =
        await forgotPassword(email);

      res.status(200).json({
        success: true,
        message:
          "Password reset token generated successfully.",
        data: {
          token: result.token,
          expiresAt:
            result.expiry,
        },
      });
    }
  );

  export const resetPasswordController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const token = String(
        req.params.token
      );

      const { password } = req.body;

      if (!password) {
        res.status(400).json({
          success: false,
          message:
            "Password is required.",
        });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters.",
        });
        return;
      }

      await resetPassword(
        token,
        password
      );

      res.status(200).json({
        success: true,
        message:
          "Password reset successfully.",
      });
    }
  );

  export const logoutController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {

      const authHeader =
        req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: "Authorization token missing",
        });
        return;
      }

      const token =
        authHeader.split(" ")[1];

      await logoutUser(token);

      res.status(200).json({
        success: true,
        message: "Logout successful.",
      });
    }
  );