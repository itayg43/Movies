import express from "express";
import asyncHandler from "express-async-handler";

import validateAccessToken from "../../middlewares/validate-access-token";
import moviesController from "./movies-controller";

import validateSchema from "../../middlewares/validate-schema";
import {
  getMoviesByCategorySchema,
  getMovieDetailsByIdSchema,
  getMoviesBySearchQuerySchema,
} from "./movies-schemas";

const moviesRouter = express.Router();

moviesRouter.get(
  "/",
  [validateAccessToken, validateSchema(getMoviesByCategorySchema)],
  asyncHandler(moviesController.getMoviesByCategory)
);

moviesRouter.get(
  "/search",
  [validateAccessToken, validateSchema(getMoviesBySearchQuerySchema)],
  asyncHandler(moviesController.getMoviesBySearchQuery)
);

moviesRouter.get(
  "/:id",
  [validateAccessToken, validateSchema(getMovieDetailsByIdSchema)],
  asyncHandler(moviesController.getMovieDetailsById)
);

export default moviesRouter;
