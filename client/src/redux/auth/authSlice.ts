import {createSlice} from '@reduxjs/toolkit';

import {User} from '../../types';
import authActions from './authActions';

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
      .addCase(authActions.loginUser.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(authActions.loginUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // register
      .addCase(authActions.registerUser.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(authActions.registerUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      })

      // logout
      .addCase(authActions.logoutUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(authActions.logoutUser.rejected, (state, {payload}) => {
        if (payload) {
          state.errorMessage = payload;
        }
      });
  },
});

export default authSlice.reducer;
