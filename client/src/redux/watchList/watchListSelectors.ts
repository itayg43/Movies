import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

const selectWatchListEntities = (state: RootState) => state.watchList.entities;

export const selectWatchList = createSelector(
  selectWatchListEntities,
  watchListEntities => Object.values(watchListEntities),
);

export const selectWatchListByMovieId = createSelector(
  [selectWatchList, (_, movieId: number) => movieId],
  (watchList, movieId) => watchList.find(w => w.movie.id === movieId),
);

export const selectWatchListGetInitialRequestStatus = (state: RootState) =>
  state.watchList.initialGetRequestStatus;

export const selectWatchListErrorMessage = (state: RootState) =>
  state.watchList.errorMessage;
