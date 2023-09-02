import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";
import {
  GetMoviesByCategoryInput,
  GetMovieDetailsByIdInput,
} from "./movies-schemas";

const getMoviesByCategory = async (
  req: Request<{}, {}, {}, GetMoviesByCategoryInput>,
  res: Response
) => {
  const movies = await moviesService.getMoviesByCategory(req.query.category);

  res.status(statusCode.ok).json(movies);
};

const getMovieDetailsById = async (
  req: Request<GetMovieDetailsByIdInput>,
  res: Response
) => {
  const movieDetails = await moviesService.getMovieDetailsById(req.params.id);

  res.status(statusCode.ok).json(movieDetails);
};

export default {
  getMoviesByCategory,
  getMovieDetailsById,
};
