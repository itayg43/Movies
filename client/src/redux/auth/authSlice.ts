import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from '../../types';

type AuthState = {
  status: 'idle' | 'loading' | 'succeded' | 'failed';
  message: string;
  user: User | null;
};

const initialState: AuthState = {
  status: 'idle',
  message: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserRequest: state => {
      state.status = 'loading';
    },
    loginUserRequestSucceded: (state, action: PayloadAction<User>) => {
      state.status = 'succeded';
      state.user = action.payload;
    },
    loginUserRequestFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.message = action.payload;
    },

    resetAuthStatusAndMessage: state => {
      state.status = 'idle';
      state.message = '';
    },
  },
});

export const {
  loginUserRequest,
  loginUserRequestSucceded,
  loginUserRequestFailed,
  resetAuthStatusAndMessage,
} = authSlice.actions;

export default authSlice.reducer;
