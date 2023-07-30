import { Request, Response, NextFunction } from "express";

import { statusCode } from "../constants";

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  const status = error.statusCode ?? statusCode.internal;
  const message = error.message ?? DEFAULT_ERROR_MESSAGE;
  res.status(status).json({ message });
};

export default errorHandler;
