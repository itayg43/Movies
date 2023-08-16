import {AppDispatch} from '../store';
import {
  loginUserRequest,
  loginUserRequestSucceded,
  loginUserRequestFailed,
  registerUserRequest,
  registerUserRequestSucceded,
  registerUserRequestFailed,
} from './authSlice';
import authService from '../../services/authService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {LoginFormData, RegisterFormData} from '../../types';

const loginUserAsync =
  (loginFormData: LoginFormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginUserRequest());
      const user = await authService.loginUser(loginFormData);
      dispatch(loginUserRequestSucceded(user));
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      dispatch(loginUserRequestFailed(message));
    }
  };

const registerUserAsync =
  (registerFormData: RegisterFormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerUserRequest());
      const user = await authService.registerUser(registerFormData);
      dispatch(registerUserRequestSucceded(user));
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      dispatch(registerUserRequestFailed(message));
    }
  };

export default {
  loginUserAsync,
  registerUserAsync,
};
