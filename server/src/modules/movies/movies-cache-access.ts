import { redisClient } from "../../app";

import { Movie } from "./tmdb/tmdb-service";

const key = "movies";

const getMovies = async (): Promise<Movie[] | null> => {
  const jsonValue = await redisClient.get(key);

  return jsonValue ? JSON.parse(jsonValue) : null;
};

const setMovies = async (values: Movie[]) => {
  await redisClient.set(key, JSON.stringify(values));
};

export default {
  getMovies,
  setMovies,
};
