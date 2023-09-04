import _ from "lodash";

import watchListDataAccess from "./watch-list-data-access";
import moviesService from "../movies/movies-service";
import { ConflictError } from "../../errors";

const detailsAttributesToOmit = [
  "posterUrl",
  "genres",
  "youTubeTrailerUrl",
  "recommendations",
];

const addWatchList = async (userId: number, movieId: number) => {
  const isExist = await watchListDataAccess.isWatchListExist(userId, movieId);

  if (isExist) {
    throw new ConflictError("Watch list already exist");
  }

  const watchList = await watchListDataAccess.createWatchList(userId, movieId);

  const movie = await moviesService.getMovieDetailsById(movieId);

  return {
    id: watchList.id,
    createdAt: watchList.createdAt,
    movie: _.omit(movie, detailsAttributesToOmit),
  };
};

const getWatchList = async (userId: number) => {
  const watchList = await watchListDataAccess.findWatchList(userId);

  const promises = watchList.map(async (w) => {
    const movie = await moviesService.getMovieDetailsById(w.movieId);

    return {
      id: w.id,
      createdAt: w.createdAt,
      movie: _.omit(movie, detailsAttributesToOmit),
    };
  });

  return await Promise.all(promises);
};

export default {
  addWatchList,
  getWatchList,
};
