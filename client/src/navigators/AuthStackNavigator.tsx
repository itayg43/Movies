import React from 'react';
import {Alert} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useAppSelector} from '../hooks';
import {
  selectAuthErrorMessage,
  selectAuthStatus,
} from '../redux/auth/authSelectors';

type AuthStackParams = {
  loginScreen: undefined;
  registerScreen: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'loginScreen'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'registerScreen'
>;

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  return (
    <>
      <Stack.Navigator initialRouteName="loginScreen">
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{
            headerTitle: 'Login',
          }}
        />

        <Stack.Screen
          name="registerScreen"
          component={RegisterScreen}
          options={{
            headerTitle: 'Register',
          }}
        />
      </Stack.Navigator>

      {authStatus === 'failed' && <>{Alert.alert('Error', authErrorMessage)}</>}
    </>
  );
};

export default AuthStackNavigator;
