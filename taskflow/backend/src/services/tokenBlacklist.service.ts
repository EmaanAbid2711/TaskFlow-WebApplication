import jwt from "jsonwebtoken";

import prisma from "../config/prisma";
import AppError from "../utils/AppError";

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

/*
|--------------------------------------------------------------------------
| Blacklist a JWT
|--------------------------------------------------------------------------
*/

export const blacklistToken = async (
  token: string
) => {
  const decoded =
    jwt.decode(token) as JwtPayload | null;

  if (!decoded?.exp) {
    throw new AppError("Invalid token.", 400);
  }

  await prisma.tokenBlacklist.create({
    data: {
      token,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });
};

/*
|--------------------------------------------------------------------------
| Check whether token is blacklisted
|--------------------------------------------------------------------------
*/

export const isTokenBlacklisted =
  async (
    token: string
  ) => {
    const existing =
      await prisma.tokenBlacklist.findUnique({
        where: {
          token,
        },
      });

    return !!existing;
  };

/*
|--------------------------------------------------------------------------
| Remove expired tokens
|--------------------------------------------------------------------------
*/

export const clearExpiredBlacklistedTokens =
  async () => {
    await prisma.tokenBlacklist.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  };