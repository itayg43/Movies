import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {MovieEntities} from '../../types';
import moviesAsyncActions from './moviesAsyncActions';

type MoviesState = {
  message: string;
  searchQuery: string;
  entities: MovieEntities;
};

const initialState: MoviesState = {
  message: '',
  searchQuery: '',
  entities: {},
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateMoviesSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(moviesAsyncActions.getMovies.fulfilled, (state, {payload}) => {
        state.message = '';
        state.entities = payload;
      })
      .addCase(moviesAsyncActions.getMovies.rejected, (state, {payload}) => {
        if (payload) {
          state.message = payload;
        }
      });
  },
});

export const {updateMoviesSearchQuery} = moviesSlice.actions;

export default moviesSlice.reducer;
