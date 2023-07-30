import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

import { statusCode } from "../constants";

const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(statusCode.badRequest).json(error.errors);
    }
  };

export default validateSchema;
