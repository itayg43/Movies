import { Request, Response, NextFunction } from "express";

import { statusCode } from "../../constants";
import { GetMovieDetailsInput } from "./movies-schemas";
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

const checkCacheForMovieDetails = async (
  req: Request<GetMovieDetailsInput>,
  res: Response,
  next: NextFunction
) => {
  const cachedMovieDetails = await moviesCacheAccess.getMovieDetailsById(
    req.params.id
  );

  if (cachedMovieDetails) {
    res.status(statusCode.ok).json(cachedMovieDetails);
  } else {
    next();
  }
};

export default {
  checkCacheForMovies,
  checkCacheForMovieDetails,
};
