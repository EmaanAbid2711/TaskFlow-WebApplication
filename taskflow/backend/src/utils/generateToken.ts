import jwt from "jsonwebtoken";

import { env } from "../config/env";

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (
  payload: TokenPayload
) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};