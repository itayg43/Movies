import { redisClient } from "../../app";

import { Movie, MovieDetails } from "./movies-entities";
import { MoviesCategory } from "./tmdb/tmdb-service";

const FIFTEEN_MINUTES_TTL = 15 * 60;
const ONE_HOUR_TTL = 60 * 60;

const getMoviesByCategory = async (
  category: MoviesCategory
): Promise<Movie[] | null> => {
  const jsonValue = await redisClient.get(`movies_${category}`);

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMoviesForCategory = async (
  category: MoviesCategory,
  values: Movie[]
) => {
  await redisClient.set(`movies_${category}`, JSON.stringify(values), {
    EX: ONE_HOUR_TTL,
    NX: true,
  });
};

const getMoviesBySearchQuery = async (
  searchQuery: string
): Promise<Movie[] | null> => {
  const jsonValue = await redisClient.get(`movies_${searchQuery}`);

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMoviesForSearchQuery = async (
  searchQuery: string,
  values: Movie[]
) => {
  await redisClient.set(`movies_${searchQuery}`, JSON.stringify(values), {
    EX: ONE_HOUR_TTL,
    NX: true,
  });
};

const getMovieDetailsById = async (
  id: number | string
): Promise<MovieDetails | null> => {
  const jsonValue = await redisClient.get(`movie_${id}`);

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMovieDetails = async (value: MovieDetails) => {
  await redisClient.set(`movie_${value.id}`, JSON.stringify(value), {
    EX: FIFTEEN_MINUTES_TTL,
    NX: true,
  });
};

export default {
  getMoviesByCategory,
  setMoviesForCategory,
  getMoviesBySearchQuery,
  setMoviesForSearchQuery,
  getMovieDetailsById,
  setMovieDetails,
};
