import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";

const getMovies = async (_: Request, res: Response) => {
  const movies = await moviesService.getMovies();

  res.status(statusCode.ok).json(movies);
};

export default {
  getMovies,
};
