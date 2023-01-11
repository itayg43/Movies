import {RootState} from '../store';

export const selectStatus = (state: RootState) => state.movies.status;

export const selectErrorMessage = (state: RootState) =>
  state.movies.errorMessage;

export const selectEntities = (state: RootState) => state.movies.entities;

export const selectSearchQuery = (state: RootState) => state.movies.searchQuery;

export const selectSearchResults = (state: RootState) =>
  state.movies.searchResults;
