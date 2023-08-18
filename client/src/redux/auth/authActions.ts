import {createAsyncThunk} from '@reduxjs/toolkit';

import authService from '../../services/authService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {LoginFormData, RegisterFormData, User} from '../../types';

const loginUser = createAsyncThunk<User, LoginFormData, {rejectValue: string}>(
  'auth/loginUser',
  async (loginFormData, {rejectWithValue}) => {
    try {
      return await authService.loginUser(loginFormData);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const registerUser = createAsyncThunk<
  User,
  RegisterFormData,
  {rejectValue: string}
>('auth/registerUser', async (registerFormData, {rejectWithValue}) => {
  try {
    return await authService.registerUser(registerFormData);
  } catch (error) {
    const message = errorHandlerUtil.extractMessage(error);
    return rejectWithValue(message);
  }
});

const logoutUser = createAsyncThunk<undefined, void, {rejectValue: string}>(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await authService.logoutUser();
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default {
  loginUser,
  registerUser,
  logoutUser,
};
