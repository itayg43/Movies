import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import authService from '../../services/authService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {LoginFormData, RegisterFormData, User} from '../../types';

export const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

const loginUser = definedCreateAsyncThunk<User, LoginFormData>(
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

const registerUser = definedCreateAsyncThunk<User, RegisterFormData>(
  'auth/registerUser',
  async (registerFormData, {rejectWithValue}) => {
    try {
      return await authService.registerUser(registerFormData);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const logoutUser = definedCreateAsyncThunk<undefined, void>(
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
