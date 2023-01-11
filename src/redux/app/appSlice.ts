import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum AppStatus {
  idle,
  loading,
  error,
  ready,
}

interface AppState {
  status: AppStatus;
  errorMessage: string;
}

const initialState: AppState = {
  status: AppStatus.idle,
  errorMessage: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getData: state => {
      state.status = AppStatus.loading;
    },
    getDataSuccess: state => {
      state.status = AppStatus.ready;
    },
    getDataFail: (state, action: PayloadAction<string>) => {
      state.status = AppStatus.error;
      state.errorMessage = action.payload;
    },
  },
});

export const {getData, getDataSuccess, getDataFail} = appSlice.actions;

export default appSlice.reducer;
