import { Request, Response, NextFunction } from "express";
import { SERVER_ERROR } from "../constants/statusCodes";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || SERVER_ERROR).send({
    status: error.statusCode || SERVER_ERROR,
    errorCode: error.errorCode,
    message: error.statusCode ? error.message : "Internal Server Error."
  });
  console.log(error);
};
