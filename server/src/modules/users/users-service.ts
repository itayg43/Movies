import _ from "lodash";

import watchListDataAccess from "./watch-list-data-access";
import moviesService from "../movies/movies-service";
import { NotFoundError } from "../../errors";

const detailsAttributesToOmit = [
  "posterUrl",
  "genres",
  "youTubeTrailerUrl",
  "recommendations",
];

const addWatchList = async (userId: number, movieId: number) => {
  const existWatchList = await watchListDataAccess.findWatchList(
    userId,
    movieId
  );

  const watchList = existWatchList
    ? await watchListDataAccess.updateWatchListStatus(
        existWatchList.id,
        "ACTIVE"
      )
    : await watchListDataAccess.createWatchList(userId, movieId);

  const movie = await moviesService.getMovieDetailsById(movieId);

  return {
    id: watchList.id,
    createdAt: watchList.createdAt,
    movie: _.omit(movie, detailsAttributesToOmit),
  };
};

const getWatchList = async (userId: number) => {
  const watchList = await watchListDataAccess.findWatchListByUserId(userId);

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

const softDeleteWatchList = async (id: number) => {
  const watchList = await watchListDataAccess.findWatchListById(id);

  if (!watchList) {
    throw new NotFoundError("No watch list with given id");
  }

  await watchListDataAccess.updateWatchListStatus(id, "DELETED");
};

export default {
  addWatchList,
  getWatchList,
  softDeleteWatchList,
};
