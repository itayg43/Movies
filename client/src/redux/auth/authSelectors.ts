import {RootState} from '../store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthErrorMessage = (state: RootState) =>
  state.auth.errorMessage;
