import {createSlice} from '@reduxjs/toolkit';

import {WatchlistEntities} from '../../types';
import watchlistActions from './watchlistActions';

type WatchlistState = {
  entities: WatchlistEntities;
  errorMessage: string;
};

const initialState: WatchlistState = {
  entities: {},
  errorMessage: '',
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(watchlistActions.getWatchlist.fulfilled, (state, {payload}) => {
        state.entities = payload;
        state.errorMessage = '';
      })
      .addCase(watchlistActions.getWatchlist.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      });
  },
});

export default watchlistSlice.reducer;
