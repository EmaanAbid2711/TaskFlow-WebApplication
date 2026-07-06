import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {signupSchema, loginSchema} from "../validations/auth.validation";
import {signupUser, loginUser} from "../services/auth.service";
import { generateToken } from "../utils/generateToken";

export const signup = asyncHandler(
  async (req: Request, res: Response) => {

    const data = signupSchema.parse(req.body);
    const user = await signupUser(data);
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {

    const data = loginSchema.parse(req.body);
    const user = await loginUser(data);
    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  }
);