import { Request, Response } from "express";

import { statusCode } from "../../constants";
import authService from "./auth-service";
import {
  RegisterUserInput,
  LoginUserInput,
  ReissueUserAccessTokenInput,
} from "./auth-schemas";
import { UserDtoMapper } from "./auth-dto";

const userDtoMapper = new UserDtoMapper();

const registerUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.registerUser(email, password);

  res.status(statusCode.created).json({
    ...userDtoMapper.map(user),
    tokens,
  });
};

const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.loginUser(email, password);

  res.status(statusCode.ok).json({
    ...userDtoMapper.map(user),
    tokens,
  });
};

const reissueUserAccessToken = async (
  req: Request<{}, {}, ReissueUserAccessTokenInput>,
  res: Response
) => {
  const { refreshToken } = req.body;
  const accessToken = authService.reissueUserAccessToken(refreshToken);

  res.status(statusCode.ok).json({ accessToken });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
