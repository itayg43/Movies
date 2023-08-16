import {AppDispatch} from '../store';
import {
  loginUserRequest,
  loginUserRequestSucceded,
  loginUserRequestFailed,
} from './authSlice';
import authService from '../../services/authService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {LoginFormData} from '../../types';

const loginUserAsync =
  (loginFormData: LoginFormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginUserRequest());
      const user = await authService.loginUser(loginFormData);
      dispatch(loginUserRequestSucceded(user));
    } catch (error) {
      dispatch(loginUserRequestFailed(errorHandlerUtil.extractMessage(error)));
    }
  };

export default {
  loginUserAsync,
};
