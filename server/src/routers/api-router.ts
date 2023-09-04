import express from "express";

import authRouter from "../modules/auth/auth-router";
import usersRouter from "../modules/users/users-router";
import moviesRouter from "../modules/movies/movies-router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/movies", moviesRouter);

export default apiRouter;
