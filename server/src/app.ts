import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { statusCode } from "./constants";
import requestLogger from "./middlewares/request-logger";
import errorHandler from "./middlewares/error-handler";
import apiRouter from "./routers/api-router";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/health", (_: Request, res: Response) => {
  res.sendStatus(statusCode.ok);
});
app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
