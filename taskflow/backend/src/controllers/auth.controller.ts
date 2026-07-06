import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { signupSchema } from "../validations/auth.validation";
import { signupUser } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";

export const signup = asyncHandler(
  async (req: Request, res: Response) => {

    // Validate request body
    const data = signupSchema.parse(req.body);
    // Create user
    const user = await signupUser(data);
    // Generate JWT
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