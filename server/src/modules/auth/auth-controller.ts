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

export default {
  registerUser,
  loginUser,
};
