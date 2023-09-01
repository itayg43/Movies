import {RootState} from '../store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthMessage = (state: RootState) => state.auth.message;
