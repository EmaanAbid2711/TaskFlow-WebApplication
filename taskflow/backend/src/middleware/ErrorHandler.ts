import { Request, Response, NextFunction} from "express";

import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  //---------------------------------
  // App Errors
  //---------------------------------
  if(err instanceof AppError){

    return res.status(
      err.statusCode
    ).json({
      success:false,
      message:
        err.message,
    });
  }

  //---------------------------------
  // Zod Validation Errors
  //---------------------------------
  if(err instanceof ZodError){
    return res.status(400)
    .json({
      success:false,
      message:
        "Validation failed.",

      errors:
        err.issues.map(
          issue=>({
            field:
              issue.path.join("."),
            message:
              issue.message,
          })
        )
    });
  }

  //---------------------------------
  // Prisma Errors
  //---------------------------------

  if(
    err instanceof Prisma.PrismaClientKnownRequestError
  ){

    switch(err.code){
      // Unique constraint
      case "P2002":

        return res.status(409)
        .json({
          success:false,
          message:
            "Record already exists."
        });

      // Record not found
      case "P2025":

        return res.status(404)
        .json({
          success:false,
          message:
            "Record not found."
        });

    }
  }

  //---------------------------------
  // Unknown Errors
  //---------------------------------

  console.error(
    err
  );

  return res.status(500)
  .json({
    success:false,
    message:
      "Internal Server Error."
  });
}

export default errorHandler;