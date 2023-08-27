import usersDataAccess from "./users-data-access";

const addWatchList = async (movieId: number, userId: number) => {
  const watchList = await usersDataAccess.findFirstWatchListByMovieIdAndUserId(
    movieId,
    userId
  );

  if (watchList) {
    throw new Error(`Watch list with movie id ${movieId} already exist`);
  }

  return await usersDataAccess.createWatchList(movieId, userId);
};

export default {
  addWatchList,
};
