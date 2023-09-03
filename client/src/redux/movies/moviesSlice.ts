import {createSlice} from '@reduxjs/toolkit';

import {Movie} from '../../types';
import moviesAsyncActions from './moviesAsyncActions';

type MoviesState = {
  entities: Movie[];
  errorMessage: string;
};

const initialState: MoviesState = {
  entities: [],
  errorMessage: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        moviesAsyncActions.getMoviesByCategory.fulfilled,
        (state, {payload}) => {
          state.entities = payload;
          state.errorMessage = '';
        },
      )
      .addCase(
        moviesAsyncActions.getMoviesByCategory.rejected,
        (state, {payload}) => {
          if (payload) {
            state.errorMessage = payload;
          }
        },
      );
  },
});

export default moviesSlice.reducer;
