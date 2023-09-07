import {createSlice} from '@reduxjs/toolkit';

import {WatchListEntities} from '../../types';
import watchListAsyncActions from './watchListAsyncActions';

type WatchListState = {
  entities: WatchListEntities;
  errorMessage: string;
};

const initialState: WatchListState = {
  entities: {},
  errorMessage: '',
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
          state.errorMessage = '';
        },
      )
      .addCase(
        watchListAsyncActions.getWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.errorMessage = payload;
          }
        },
      )

      // add
      .addCase(
        watchListAsyncActions.addWatchList.fulfilled,
        (state, {payload}) => {
          state.entities[payload.id] = payload;
        },
      )
      .addCase(
        watchListAsyncActions.addWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.errorMessage = payload;
          }
        },
      )

      // remove
      .addCase(
        watchListAsyncActions.removeWatchList.fulfilled,
        (state, {payload}) => {
          delete state.entities[payload];
        },
      )
      .addCase(
        watchListAsyncActions.removeWatchList.rejected,
        (state, {payload}) => {
          if (payload) {
            state.errorMessage = payload;
          }
        },
      );
  },
});

export default watchList.reducer;
