import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Movie} from '../../entities/Movie';

export enum MovieStatus {
  idle,
  loading,
  error,
}

interface MovieState {
  status: MovieStatus;
  errorMessage: string;
  entity: Movie | null;
  recommendedEntities: Movie[] | null;
}

const initialState: MovieState = {
  status: MovieStatus.idle,
  errorMessage: '',
  entity: null,
  recommendedEntities: null,
};

interface MovieDetailsSuccessPayload {
  entity: Movie;
  recommendedEntities: Movie[];
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    getMovieDetails: state => {
      state.status = MovieStatus.loading;
    },
    getMovieDetailsSuccess: (
      state,
      action: PayloadAction<MovieDetailsSuccessPayload>,
    ) => {
      state.status = MovieStatus.idle;
      state.entity = action.payload.entity;
      state.recommendedEntities = action.payload.recommendedEntities;
    },
    getMovieDetailsFail: (state, action: PayloadAction<string>) => {
      state.status = MovieStatus.error;
      state.errorMessage = action.payload;
    },
  },
});

export const {getMovieDetails, getMovieDetailsSuccess, getMovieDetailsFail} =
  movieSlice.actions;

export default movieSlice.reducer;
