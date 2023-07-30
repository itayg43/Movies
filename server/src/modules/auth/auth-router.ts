import express from "express";
import asyncHandler from "express-async-handler";

import validateResource from "../../middlewares/validate-resource";
import { registerUserSchema, loginUserSchema } from "./auth-schemas";
import authController from "./auth-controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [validateResource(registerUserSchema)],
  asyncHandler(authController.registerUser)
);

authRouter.post(
  "/login",
  [validateResource(loginUserSchema)],
  asyncHandler(authController.loginUser)
);

export default authRouter;
