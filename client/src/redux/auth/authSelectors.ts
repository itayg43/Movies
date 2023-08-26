import {RootState} from '../store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectAuthErrorMessage = (state: RootState) =>
  state.auth.errorMessage;
