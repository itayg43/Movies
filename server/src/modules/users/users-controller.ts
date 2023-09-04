import { Request, Response } from "express";

import {
  AddWatchListInput,
  SoftDeleteWatchListInput,
} from "./watch-list-schemas";
import usersService from "./users-service";
import { statusCode } from "../../constants";

const addWatchList = async (
  req: Request<{}, {}, AddWatchListInput["body"]>,
  res: Response
) => {
  const { id: userId } = res.locals.user;
  const { movieId } = req.body;

  const watchList = await usersService.addWatchList(userId, movieId);

  res.status(statusCode.created).json(watchList);
};

const getWatchList = async (_: Request, res: Response) => {
  const { id: userId } = res.locals.user;

  const watchList = await usersService.getWatchList(userId);

  res.status(statusCode.ok).json(watchList);
};

const softDeleteWatchList = async (
  req: Request<SoftDeleteWatchListInput["params"]>,
  res: Response
) => {
  const parsedId = parseInt(req.params.id);

  await usersService.softDeleteWatchList(parsedId);

  res.sendStatus(statusCode.ok);
};

export default {
  addWatchList,
  getWatchList,
  softDeleteWatchList,
};
