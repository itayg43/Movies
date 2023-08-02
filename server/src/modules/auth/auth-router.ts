import express from "express";
import asyncHandler from "express-async-handler";

import validateSchema from "../../middlewares/validate-schema";
<<<<<<< HEAD
import { registerUserSchema, loginUserSchema } from "./auth-schemas";
import validateRefreshToken from "./middlewares/validate-refresh-token";
=======
import {
  registerUserSchema,
  loginUserSchema,
  reissueUserTokensSchema,
} from "./auth-schemas";
>>>>>>> parent of b1e69a2 (edit: reissue tokens flow)
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
  "/reissue-tokens",
  [validateSchema(reissueUserTokensSchema)],
  asyncHandler(authController.reissueUserTokens)
);

export default authRouter;
