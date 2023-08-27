import express from "express";
import asyncHandler from "express-async-handler";

import validateAccessToken from "../../middlewares/validate-access-token";
import moviesController from "./movies-controller";
import moviesMiddlewares from "./movies-middlewares";
import validateSchema from "../../middlewares/validate-schema";
import { getMovieDetailsSchema } from "./movies-schemas";

const mvoiesRouter = express.Router();

mvoiesRouter.get(
  "/",
  [validateAccessToken, asyncHandler(moviesMiddlewares.checkCacheForMovies)],
  asyncHandler(moviesController.getMovies)
);

mvoiesRouter.get(
  "/:id",
  [
    validateAccessToken,
    validateSchema(getMovieDetailsSchema),
    asyncHandler(moviesMiddlewares.checkCacheForMovieDetails),
  ],
  asyncHandler(moviesController.getMovieDetailsById)
);

export default mvoiesRouter;
