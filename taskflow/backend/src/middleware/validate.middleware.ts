import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validate =
  (schema: z.ZodTypeAny) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;