import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader =
    req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({
      success:false,
      message:
        "Authorization token missing"
    });
  }

  const token =
    authHeader.split(" ")[1];
  try {
    const decoded =
      jwt.verify(
        token,
        env.JWT_SECRET
      ) as {
        id:string;
        email:string;
      };
    req.user = decoded;
    next();
  } catch(error){
    return res.status(401).json({
      success:false,
      message:
        "Invalid or expired token"
    });
  }
};

export default authMiddleware;