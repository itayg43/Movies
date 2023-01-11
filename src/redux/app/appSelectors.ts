import {RootState} from '../store';

export const selectStatus = (state: RootState) => state.app.status;

export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
