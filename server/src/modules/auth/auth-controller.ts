import { Request, Response } from "express";

import { statusCode } from "../../constants";
import authService from "./auth-service";
import {
  RegisterUserInput,
  LoginUserInput,
  ReissueUserAccessTokenInput,
} from "./auth-schemas";

const registerUser = async (
  req: Request<{}, {}, RegisterUserInput["body"]>,
  res: Response
) => {
  const user = await authService.registerUser(req.body);

  res.status(statusCode.created).json(user);
};

const loginUser = async (
  req: Request<{}, {}, LoginUserInput["body"]>,
  res: Response
) => {
  const user = await authService.loginUser(req.body);

  res.status(statusCode.ok).json(user);
};

const reissueUserAccessToken = async (
  req: Request<{}, {}, ReissueUserAccessTokenInput["body"]>,
  res: Response
) => {
  const accessToken = authService.reissueUserAccessToken(req.body);

  res.status(statusCode.ok).json({
    accessToken,
  });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
