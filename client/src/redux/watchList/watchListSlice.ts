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
      );
  },
});

export const selectWatchListEntities = (state: RootState) =>
  state.watchList.entities;

export const selectWatchList = createSelector(
  selectWatchListEntities,
  watchListEntities => Object.values(watchListEntities),
);

export default watchList.reducer;
