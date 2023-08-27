import express from "express";
import asyncHandler from "express-async-handler";

import validateSchema from "../../middlewares/validate-schema";
import validateAccessToken from "../../middlewares/validate-access-token";
import usersController from "./users-controller";
import { addWatchListSchema } from "./users-schemas";

const usersRouter = express.Router();

usersRouter.post(
  "/:userId/watch-list",
  [validateAccessToken, validateSchema(addWatchListSchema)],
  asyncHandler(usersController.addWatchList)
);

export default usersRouter;
