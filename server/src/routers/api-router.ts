import express from "express";

import authRouter from "../modules/auth/auth-router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
