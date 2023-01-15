import {RootState} from '../store';

export const selectStatus = (state: RootState) => state.movie.status;

export const selectErrorMessage = (state: RootState) =>
  state.movie.errorMessage;

export const selectEntity = (state: RootState) => state.movie.entity;
