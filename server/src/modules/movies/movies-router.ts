import express from "express";

import moviesController from "./movies-controller";

const mvoiesRouter = express.Router();

mvoiesRouter.get("/", moviesController.getMovies);

export default mvoiesRouter;
