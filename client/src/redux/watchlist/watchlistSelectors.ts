import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectWatchlistEntities = (state: RootState) =>
  state.watchlist.entities;

export const selectWatchlistErrorMessage = (state: RootState) =>
  state.watchlist.errorMessage;

export const selectWatchlist = createSelector(
  selectWatchlistEntities,
  watchlistEntities => {
    return Object.values(watchlistEntities);
  },
);
