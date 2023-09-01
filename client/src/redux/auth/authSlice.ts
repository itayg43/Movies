import {createSlice} from '@reduxjs/toolkit';

import {User} from '../../types';
import authAsyncActions from './authAsyncActions';

type AuthState = {
  user: User | null;
  errorMessage: string;
};

const initialState: AuthState = {
  user: null,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // login
      .addCase(authAsyncActions.loginUser.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.errorMessage = '';
      })
      .addCase(authAsyncActions.loginUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // register
      .addCase(authAsyncActions.registerUser.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.errorMessage = '';
      })
      .addCase(authAsyncActions.registerUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // logout
      .addCase(authAsyncActions.logoutUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(authAsyncActions.logoutUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      });
  },
});

export default authSlice.reducer;
