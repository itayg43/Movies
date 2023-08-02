import { Request, Response, NextFunction } from "express";

import { statusCode } from "../constants";
import jwtUtils from "../modules/auth/utils/jwt-utils";

const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  if (!token) {
    return res
      .status(statusCode.unauthorized)
      .json({ message: "Please provide access token" });
  }

  const { isValid, payload } = jwtUtils.validateToken(
    token,
    process.env.ACCESS_TOKEN_PUBLIC_KEY as string
  );

  if (!isValid) {
    return res
      .status(statusCode.unauthorized)
      .json({ message: "Please provide a valid access token" });
  }

  res.locals.user = payload;
  next();
};

export default validateAccessToken;
