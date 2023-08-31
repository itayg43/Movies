import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectMoviesMessage = (state: RootState) => state.movies.message;

export const selectMoviesSearchQuery = (state: RootState) =>
  state.movies.searchQuery;

export const selectMoviesEntities = (state: RootState) => state.movies.entities;

export const selectMovies = createSelector(
  selectMoviesSearchQuery,
  selectMoviesEntities,
  (searchQuery, moviesEntities) => {
    const movies = Object.values(moviesEntities);

    if (searchQuery === '') {
      return movies;
    }

    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  },
);
