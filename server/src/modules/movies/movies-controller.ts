import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";

const getMovies = async (_: Request, res: Response) => {
  const movies = await moviesService.getMovies();

  res.status(statusCode.ok).json(movies);
};

const getMovieDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movieDetails = await moviesService.getMovieDetailsById(
    Number.parseInt(id)
  );

  res.status(statusCode.ok).json(movieDetails);
};

export default {
  getMovies,
  getMovieDetailsById,
};
