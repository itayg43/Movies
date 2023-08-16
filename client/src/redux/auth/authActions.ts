import {createAsyncThunk} from '@reduxjs/toolkit';

import authService from '../../services/authService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {LoginFormData, RegisterFormData} from '../../types';

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginFormData: LoginFormData, {rejectWithValue}) => {
    try {
      return await authService.loginUser(loginFormData);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerFormData: RegisterFormData, {rejectWithValue}) => {
    try {
      return await authService.registerUser(registerFormData);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const logoutUser = createAsyncThunk(
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
