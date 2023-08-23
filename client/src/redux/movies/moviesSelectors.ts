import {RootState} from '../store';

export const selectMovies = (state: RootState) =>
  Object.values(state.movies.entities);

export const selectMoviesErrorMessage = (state: RootState) =>
  state.movies.errorMessage;
