import { Request, Response } from "express";

import { statusCode } from "../../constants";
import usersService from "./users-service";
import {
  AddToUserWatchlistInput,
  SoftDeleteUserWatchlistItemInput,
} from "./users-schemas";

const addToUserWatchlist = async (
  req: Request<{}, {}, AddToUserWatchlistInput>,
  res: Response
) => {
  const { id } = res.locals.user;
  const { movieId } = req.body;

  const watchlist = await usersService.addToUserWatchlist(id, movieId);

  res.status(statusCode.created).json(watchlist);
};

const getUserWatchlist = async (_: Request, res: Response) => {
  const { id } = res.locals.user;

  const watchlist = await usersService.getUserWatchlist(id);

  res.status(statusCode.ok).json(watchlist);
};

const softDeleteUserWatchlistItem = async (
  req: Request<SoftDeleteUserWatchlistItemInput>,
  res: Response
) => {
  await usersService.softDeleteUserWatchlistItem(
    Number.parseInt(req.params.id)
  );

  res.sendStatus(statusCode.ok);
};

export default {
  addToUserWatchlist,
  getUserWatchlist,
  softDeleteUserWatchlistItem,
};
