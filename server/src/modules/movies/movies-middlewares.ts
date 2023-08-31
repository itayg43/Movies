import { Request, Response, NextFunction } from "express";

import { statusCode } from "../../constants";
import moviesCacheAccess from "./movies-cache-access";

const checkCacheForMovies = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const cachedMovies = await moviesCacheAccess.getMovies();

  if (cachedMovies) {
    res.status(statusCode.ok).json(cachedMovies);
  } else {
    next();
  }
};

export default {
  checkCacheForMovies,
};
