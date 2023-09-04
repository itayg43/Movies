import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";
import {
  GetMoviesByCategoryInput,
  GetMovieDetailsByIdInput,
  GetMoviesBySearchQueryInput,
} from "./movies-schemas";

const getMoviesByCategory = async (
  req: Request<{}, {}, {}, GetMoviesByCategoryInput["query"]>,
  res: Response
) => {
  const movies = await moviesService.getMoviesByCategory(req.query.category);

  res.status(statusCode.ok).json(movies);
};

const getMoviesBySearchQuery = async (
  req: Request<{}, {}, {}, GetMoviesBySearchQueryInput["query"]>,
  res: Response
) => {
  const movies = await moviesService.getMoviesBySearchQuery(
    req.query.query.trim().toLowerCase()
  );

  res.status(statusCode.ok).json(movies);
};

const getMovieDetailsById = async (
  req: Request<GetMovieDetailsByIdInput["params"]>,
  res: Response
) => {
  const movieDetails = await moviesService.getMovieDetailsById(req.params.id);

  res.status(statusCode.ok).json(movieDetails);
};

export default {
  getMoviesByCategory,
  getMoviesBySearchQuery,
  getMovieDetailsById,
};
