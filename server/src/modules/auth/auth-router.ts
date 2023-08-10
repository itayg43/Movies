import express from "express";
import asyncHandler from "express-async-handler";

import validateSchema from "../../middlewares/validate-schema";
import {
  registerUserSchema,
  loginUserSchema,
  reissueUserAccessTokenSchema,
} from "./auth-schemas";
import authController from "./auth-controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [validateSchema(registerUserSchema)],
  asyncHandler(authController.registerUser)
);

authRouter.post(
  "/login",
  [validateSchema(loginUserSchema)],
  asyncHandler(authController.loginUser)
);

authRouter.post(
  "/reissue-access-token",
  [validateSchema(reissueUserAccessTokenSchema)],
  asyncHandler(authController.reissueUserAccessToken)
);

export default authRouter;
