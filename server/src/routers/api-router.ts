import express from "express";

import authRouter from "../modules/auth/auth-router";
import moviesRouter from "../modules/movies/movies-router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/movies", moviesRouter);

export default apiRouter;
