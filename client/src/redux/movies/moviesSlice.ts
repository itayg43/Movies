import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Movie} from '../../types';
import moviesActions from './moviesActions';

export type MovieEntities = {
  [id: number]: Movie;
};

type MoviesState = {
  entities: MovieEntities;
  searchQuery: string;
  errorMessage: string;
};

const initialState: MoviesState = {
  entities: {},
  searchQuery: '',
  errorMessage: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(moviesActions.getMovies.fulfilled, (state, {payload}) => {
        state.entities = payload;
        state.errorMessage = '';
      })
      .addCase(moviesActions.getMovies.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      });
  },
});

export const {updateSearchQuery} = moviesSlice.actions;

export default moviesSlice.reducer;
