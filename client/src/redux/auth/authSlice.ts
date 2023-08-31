import {createSlice} from '@reduxjs/toolkit';

import {RequestStatus, User} from '../../types';
import authActions from './authActions';

type AuthState = {
  status: RequestStatus;
  message: string;
  user: User | null;
};

const initialState: AuthState = {
  user: null,
  status: 'idle',
  message: '',
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
        state.message = '';
      })
      .addCase(authActions.loginUser.fulfilled, (state, {payload}) => {
        state.status = 'succeded';
        state.user = payload;
      })
      .addCase(authActions.loginUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      })

      // register
      .addCase(authActions.registerUser.pending, state => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(authActions.registerUser.fulfilled, (state, {payload}) => {
        state.status = 'succeded';
        state.user = payload;
      })
      .addCase(authActions.registerUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      })

      // logout
      .addCase(authActions.logoutUser.pending, state => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(authActions.logoutUser.fulfilled, state => {
        state.status = 'succeded';
        state.user = null;
      })
      .addCase(authActions.logoutUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      });
  },
});

export default authSlice.reducer;
