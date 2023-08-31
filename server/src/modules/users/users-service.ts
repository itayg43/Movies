import _ from "lodash";

import { ConflictError } from "../../errors";
import usersDataAccess from "./users-data-access";
import moviesService from "../movies/movies-service";

const movieDetailsAttributesToOmit = [
  "genres",
  "youTubeTrailerUrl",
  "recommendations",
];

const addToUserWatchlist = async (userId: number, movieId: number) => {
  const existItem = await usersDataAccess.findUserActiveWatchlistItem(
    userId,
    movieId
  );

  if (existItem) {
    throw new ConflictError("Watch list item already exist");
  }

  const watchlistItem = await usersDataAccess.createUserWatchlistItem(
    userId,
    movieId
  );

  const movieDetails = await moviesService.getMovieDetailsById(
    movieId.toString()
  );

  return {
    id: watchlistItem.id,
    createdAt: watchlistItem.createdAt,
    movie: _.omit(movieDetails, movieDetailsAttributesToOmit),
  };
};

const getUserWatchlist = async (userId: number) => {
  const watchlist = await usersDataAccess.findUserActiveWatchlist(userId);

  const mappedWatchlist = watchlist.map(async (w) => {
    const movieDetails = await moviesService.getMovieDetailsById(
      w.movieId.toString()
    );

    return {
      id: w.id,
      createdAt: w.createdAt,
      movie: _.omit(movieDetails, movieDetailsAttributesToOmit),
    };
  });

  return await Promise.all(mappedWatchlist);
};

export default {
  addToUserWatchlist,
  getUserWatchlist,
};
