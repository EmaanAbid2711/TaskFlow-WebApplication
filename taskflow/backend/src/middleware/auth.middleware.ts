import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { isTokenBlacklisted } from "../services/tokenBlacklist.service";
import AppError from "../utils/AppError";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authorization token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Authorization token missing", 401);
  }

  try {
    const blacklisted = await isTokenBlacklisted(token);

    if (blacklisted) {
      throw new AppError("Session expired. Please login again.", 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Invalid or expired token", 401);
  }
};

export default authMiddleware;