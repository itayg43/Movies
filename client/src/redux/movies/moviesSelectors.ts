import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectMoviesEntities = (state: RootState) => state.movies.entities;

export const selectMoviesErrorMessage = (state: RootState) =>
  state.movies.errorMessage;

export const selectMovies = createSelector(
  selectMoviesEntities,
  moviesEntities => Object.values(moviesEntities),
);
