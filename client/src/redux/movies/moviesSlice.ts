import {createSlice} from '@reduxjs/toolkit';

import {Movie} from '../../types';
import moviesActions from './moviesActions';

export type MovieEntities = {
  [id: number]: Movie;
};

type MoviesState = {
  entities: MovieEntities;
  errorMessage: string;
};

const initialState: MoviesState = {
  entities: {},
  errorMessage: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
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

export default moviesSlice.reducer;
