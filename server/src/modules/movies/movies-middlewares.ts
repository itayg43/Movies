import { Request, Response, NextFunction } from "express";

import { statusCode } from "../../constants";
import {
  GetMoviesByCategoryInput,
  GetMoviesBySearchQueryInput,
} from "./movies-schemas";
import moviesCacheAccess from "./movies-cache-access";

export const checkCacheForMoviesByCategory = async (
  req: Request<{}, {}, {}, GetMoviesByCategoryInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  const cachedMovies = await moviesCacheAccess.getMoviesByCategory(
    req.query.category
  );

  if (cachedMovies) {
    res.status(statusCode.ok).json(cachedMovies);
  } else {
    next();
  }
};

export const checkCacheForMoviesBySearchQuery = async (
  req: Request<{}, {}, {}, GetMoviesBySearchQueryInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  const cachedMovies = await moviesCacheAccess.getMoviesBySearchQuery(
    req.query.query.trim().toLowerCase()
  );

  if (cachedMovies) {
    res.status(statusCode.ok).json(cachedMovies);
  } else {
    next();
  }
};
