import {createSlice} from '@reduxjs/toolkit';

import {RequestStatus, User} from '../../types';
import authActions from './authActions';

type AuthState = {
  user: User | null;
  status: RequestStatus;
  errorMessage: string;
};

const initialState: AuthState = {
  user: null,
  status: 'idle',
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // login
      .addCase(authActions.loginUser.pending, state => {
        state.status = 'loading';
        state.errorMessage = '';
      })
      .addCase(authActions.loginUser.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.status = 'succeded';
      })
      .addCase(authActions.loginUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // register
      .addCase(authActions.registerUser.pending, state => {
        state.status = 'loading';
        state.errorMessage = '';
      })
      .addCase(authActions.registerUser.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.status = 'succeded';
      })
      .addCase(authActions.registerUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // logout
      .addCase(authActions.logoutUser.pending, state => {
        state.status = 'loading';
        state.errorMessage = '';
      })
      .addCase(authActions.logoutUser.fulfilled, state => {
        state.user = null;
        state.status = 'succeded';
      })
      .addCase(authActions.logoutUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.errorMessage = payload;
        }
      });
  },
});

export default authSlice.reducer;
