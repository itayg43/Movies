import {RootState} from '../store';

export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectAuthMessage = (state: RootState) => state.auth.message;

export const selectAuthUser = (state: RootState) => state.auth.user;
