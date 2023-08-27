import express from "express";

import authRouter from "../modules/auth/auth-router";
import mvoiesRouter from "../modules/movies/movies-router";
import usersRouter from "../modules/users/users-router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/movies", mvoiesRouter);

apiRouter.use("/users", usersRouter);

export default apiRouter;
