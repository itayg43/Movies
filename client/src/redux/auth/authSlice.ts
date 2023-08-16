import {createSlice} from '@reduxjs/toolkit';

import {User} from '../../types';
import authActions from './authActions';

type AuthState = {
  user: User | null;
  message: string;
};

const initialState: AuthState = {
  user: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authActions.loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authActions.loginUser.rejected, (state, action) => {
        state.message = action.payload as string;
      })

      .addCase(authActions.registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authActions.registerUser.rejected, (state, action) => {
        state.message = action.payload as string;
      })

      .addCase(authActions.logoutUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(authActions.logoutUser.rejected, (state, action) => {
        state.message = action.payload as string;
      });
  },
});

export default authSlice.reducer;
