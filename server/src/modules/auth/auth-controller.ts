import { Request, Response } from "express";

import { statusCode } from "../../constants";
import authService from "./auth-service";
import {
  RegisterUserInput,
  LoginUserInput,
  ReissueUserAccessTokenInput,
} from "./auth-schemas";

const registerUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { name, email, password } = req.body;
  const { user, userTokens } = await authService.registerUser(
    name,
    email,
    password
  );

  res.status(statusCode.created).json({
    user,
    userTokens,
  });
};

const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const { user, userTokens } = await authService.loginUser(email, password);

  res.status(statusCode.ok).json({
    user,
    userTokens,
  });
};

const reissueUserAccessToken = async (
  req: Request<{}, {}, ReissueUserAccessTokenInput>,
  res: Response
) => {
  const { refreshToken } = req.body;
  const accessToken = authService.reissueUserAccessToken(refreshToken);

  res.status(statusCode.ok).json({
    accessToken,
  });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
