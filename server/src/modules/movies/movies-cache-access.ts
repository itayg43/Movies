import { redisClient } from "../../app";

import { Movie } from "./tmdb/tmdb-service";

const HOUR_TTL = 60 * 60;

const getMovies = async (): Promise<Movie[] | null> => {
  const jsonValue = await redisClient.get("movies");

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMovies = async (values: Movie[]) => {
  await redisClient.set("movies", JSON.stringify(values), {
    EX: HOUR_TTL,
    NX: true,
  });
};

export default {
  getMovies,
  setMovies,
};
