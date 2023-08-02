import { Request, Response, NextFunction } from "express";

import { statusCode } from "../constants";
import jwtUtils from "../modules/auth/utils/jwt-utils";

const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  if (!token) {
    return res
      .status(statusCode.unauthorized)
      .json({ message: "Please provide refresh token" });
  }

  const { isValid, isExpired, payload } = jwtUtils.validateToken(
    token,
    process.env.REFRESH_TOKEN_PUBLIC_KEY as string
  );

  if (!isValid) {
    if (isExpired) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: "Refresh token was expired" });
    }

    return res
      .status(statusCode.unauthorized)
      .json({ message: "Invalid refresh token" });
  }

  res.locals.user = payload;
  next();
};

export default validateRefreshToken;
