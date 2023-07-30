import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default requestLogger;
