import { redisClient } from "../../app";

import { Movie, MovieDetails } from "./movies-entities";

const FIFTEEN_MINUTES_TTL = 15 * 60;
const ONE_HOUR_TTL = 60 * 60;

const getMovies = async (): Promise<Movie[] | null> => {
  const jsonValue = await redisClient.get("movies");

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMovies = async (values: Movie[]) => {
  await redisClient.set("movies", JSON.stringify(values), {
    EX: ONE_HOUR_TTL,
    NX: true,
  });
};

const getMovieDetailsById = async (
  id: number
): Promise<MovieDetails | null> => {
  const jsonValue = await redisClient.get(id.toString());

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMovieDetails = async (value: MovieDetails) => {
  await redisClient.set(`movie_${value.id}`, JSON.stringify(value), {
    EX: FIFTEEN_MINUTES_TTL,
    NX: true,
  });
};

export default {
  getMovies,
  setMovies,
  getMovieDetailsById,
  setMovieDetails,
};
