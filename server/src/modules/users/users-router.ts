import express from "express";
import asyncHandler from "express-async-handler";

import validateAccessToken from "../../middlewares/validate-access-token";
import validateSchema from "../../middlewares/validate-schema";
import { addToUserWatchlistSchema } from "./users-schemas";
import usersController from "./users-controller";

const usersRouter = express.Router();

usersRouter.post(
  "/watchlist",
  [validateAccessToken, validateSchema(addToUserWatchlistSchema)],
  asyncHandler(usersController.addToUserWatchlist)
);

usersRouter.get(
  "/watchlist",
  [validateAccessToken],
  asyncHandler(usersController.getUserWatchlist)
);

export default usersRouter;
