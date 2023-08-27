import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";
import { GetMovieDetailsInput } from "./movies-schemas";

const getMovies = async (_: Request, res: Response) => {
  const movies = await moviesService.getMovies();

  res.status(statusCode.ok).json(movies);
};

const getMovieDetailsById = async (
  req: Request<GetMovieDetailsInput>,
  res: Response
) => {
  const movieDetails = await moviesService.getMovieDetailsById(req.params.id);

  res.status(statusCode.ok).json(movieDetails);
};

export default {
  getMovies,
  getMovieDetailsById,
};
