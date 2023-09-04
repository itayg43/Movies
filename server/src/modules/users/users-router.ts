import express from "express";
import asyncHandler from "express-async-handler";

import validateAccessToken from "../../middlewares/validate-access-token";
import usersController from "./users-controller";
import validateSchema from "../../middlewares/validate-schema";
import {
  addWatchListSchema,
  softDeleteWatchListSchema,
} from "./watch-list-schemas";

const usersRouter = express.Router();

usersRouter.post(
  "/watch-list",
  [validateAccessToken, validateSchema(addWatchListSchema)],
  asyncHandler(usersController.addWatchList)
);

usersRouter.get(
  "/watch-list",
  [validateAccessToken],
  asyncHandler(usersController.getWatchList)
);

usersRouter.delete(
  "/watch-list/:id",
  [validateAccessToken, validateSchema(softDeleteWatchListSchema)],
  asyncHandler(usersController.softDeleteWatchList)
);

export default usersRouter;
