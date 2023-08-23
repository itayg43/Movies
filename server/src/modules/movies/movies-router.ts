import express from "express";
import asyncHandler from "express-async-handler";

import validateAccessToken from "../../middlewares/validate-access-token";
import moviesController from "./movies-controller";

const mvoiesRouter = express.Router();

mvoiesRouter.get(
  "/",
  [validateAccessToken],
  asyncHandler(moviesController.getMovies)
);

export default mvoiesRouter;
