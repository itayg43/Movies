import React from 'react';
import {Alert} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useAppDispatch, useAppSelector} from '../hooks';
import {selectAuthStatus, selectAuthMessage} from '../redux/auth/authSelectors';
import {resetAuthStatusAndMessage} from '../redux/auth/authSlice';

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
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);
  const authMessage = useAppSelector(selectAuthMessage);

  const handleResetAuthStatusAndMessage = () => {
    dispatch(resetAuthStatusAndMessage());
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName="loginScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="loginScreen" component={LoginScreen} />

        <Stack.Screen name="registerScreen" component={RegisterScreen} />
      </Stack.Navigator>

      {authStatus === 'failed' && (
        <>
          {Alert.alert('Error', authMessage, [
            {
              text: 'OK',
              onPress: handleResetAuthStatusAndMessage,
            },
          ])}
        </>
      )}
    </>
  );
};

export default AuthStackNavigator;
