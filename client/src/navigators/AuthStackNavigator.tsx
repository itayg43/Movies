import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

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
  return (
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
  );
};

export default AuthStackNavigator;
