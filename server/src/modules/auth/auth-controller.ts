import { Request, Response } from "express";

import { statusCode } from "../../constants";
import authService from "./auth-service";
import { RegisterUserInput, LoginUserInput } from "./auth-schemas";

const registerUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await authService.registerUser(email, password);
  res.status(statusCode.created).json(user);
};

const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  res.status(statusCode.ok).json(user);
};

const reissueUserTokens = async (_: Request, res: Response) => {
  const { id } = res.locals.user;
  const tokens = authService.reissueUserTokens({ id });
  res.status(statusCode.ok).json(tokens);
};

export default {
  registerUser,
  loginUser,
  reissueUserTokens,
};
