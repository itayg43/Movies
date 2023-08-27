import { Request, Response } from "express";

import { statusCode } from "../../constants";
import usersService from "./users-service";
import { AddWatchListInput } from "./users-schemas";

const addWatchList = async (
  req: Request<AddWatchListInput["params"], {}, AddWatchListInput["body"]>,
  res: Response
) => {
  const userId = Number.parseInt(req.params.userId);

  if (userId !== res.locals.user.id) {
    throw new Error("Forbidden");
  }

  const watchList = await usersService.addWatchList(req.body.movieId, userId);

  res.status(statusCode.created).json(watchList);
};

export default {
  addWatchList,
};
