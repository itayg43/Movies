import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Movie} from '../../entities/Movie';

export enum MoviesStatus {
  idle,
  loading,
  error,
}

export interface MoviesEntities {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

interface MoviesState {
  status: MoviesStatus;
  errorMessage: string;
  entities: MoviesEntities | null;
}

const initialState: MoviesState = {
  status: MoviesStatus.idle,
  errorMessage: '',
  entities: null,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getMovies: state => {
      state.status = MoviesStatus.loading;
    },
    getMoviesSuccess: (state, action: PayloadAction<MoviesEntities>) => {
      state.status = MoviesStatus.idle;
      state.entities = action.payload;
    },
    getMoviesFail: (state, action: PayloadAction<string>) => {
      state.status = MoviesStatus.error;
      state.errorMessage = action.payload;
    },
  },
});

export const {getMovies, getMoviesSuccess, getMoviesFail} = moviesSlice.actions;

export default moviesSlice.reducer;
