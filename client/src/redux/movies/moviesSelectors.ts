import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectMoviesEntities = (state: RootState) => state.movies.entities;

export const selectMoviesSearchQuery = (state: RootState) =>
  state.movies.searchQuery;

export const selectMoviesErrorMessage = (state: RootState) =>
  state.movies.errorMessage;

export const selectMovies = createSelector(
  selectMoviesEntities,
  selectMoviesSearchQuery,
  (moviesEntities, searchQuery) => {
    const movies = Object.values(moviesEntities);

    if (searchQuery === '') {
      return movies;
    }

    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  },
);
