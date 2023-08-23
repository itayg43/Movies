import express from "express";
import asyncHandler from "express-async-handler";

import moviesController from "./movies-controller";

const mvoiesRouter = express.Router();

mvoiesRouter.get("/", asyncHandler(moviesController.getMovies));

export default mvoiesRouter;
