import {createSlice} from '@reduxjs/toolkit';

import {RequestStatus, User} from '../../types';
import authAsyncActions from './authAsyncActions';

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
  reducers: {
    resetAuthStatusAndMessage: state => {
      state.status = 'idle';
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // login
      .addCase(authAsyncActions.loginUser.pending, state => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(authAsyncActions.loginUser.fulfilled, (state, {payload}) => {
        state.status = 'succeded';
        state.user = payload;
      })
      .addCase(authAsyncActions.loginUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      })

      // register
      .addCase(authAsyncActions.registerUser.pending, state => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(authAsyncActions.registerUser.fulfilled, (state, {payload}) => {
        state.status = 'succeded';
        state.user = payload;
      })
      .addCase(authAsyncActions.registerUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      })

      // logout
      .addCase(authAsyncActions.logoutUser.pending, state => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(authAsyncActions.logoutUser.fulfilled, state => {
        state.status = 'succeded';
        state.user = null;
      })
      .addCase(authAsyncActions.logoutUser.rejected, (state, {payload}) => {
        state.status = 'failed';
        if (payload) {
          state.message = payload;
        }
      });
  },
});

export const {resetAuthStatusAndMessage} = authSlice.actions;

export default authSlice.reducer;
