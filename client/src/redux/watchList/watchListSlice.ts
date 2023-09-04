import {createSlice, createSelector} from '@reduxjs/toolkit';

import {WatchListEntities} from '../../types';
import watchListAsyncActions from './watchListAsyncActions';
import {RootState} from '../store';

type WatchListState = {
  entities: WatchListEntities;
  message: string;
};

const initialState: WatchListState = {
  entities: {},
  message: '',
};

const watchList = createSlice({
  name: 'watchList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // get
      .addCase(
        watchListAsyncActions.getWatchList.fulfilled,
        (state, {payload}) => {
          state.entities = payload;
          state.message = '';
        },
      )
      .addCase(
        watchListAsyncActions.getWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.message = payload;
          }
        },
      )

      // add
      .addCase(
        watchListAsyncActions.addWatchList.fulfilled,
        (state, {payload}) => {
          state.entities[payload.id] = payload;
          state.message = '';
        },
      )
      .addCase(
        watchListAsyncActions.addWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.message = payload;
          }
        },
      )

      // remove
      .addCase(
        watchListAsyncActions.removeWatchList.fulfilled,
        (state, {payload}) => {
          delete state.entities[payload];
          state.message = '';
        },
      )
      .addCase(
        watchListAsyncActions.removeWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.message = payload;
          }
        },
      );
  },
});

export const selectWatchListEntities = (state: RootState) =>
  state.watchList.entities;

export const selectWatchList = createSelector(
  selectWatchListEntities,
  watchListEntities => Object.values(watchListEntities),
);

export const selectWatchListByMovieId = createSelector(
  [selectWatchList, (_, movieId: number) => movieId],
  (watchListArray, movieId) => watchListArray.find(w => w.movie.id === movieId),
);

export default watchList.reducer;
