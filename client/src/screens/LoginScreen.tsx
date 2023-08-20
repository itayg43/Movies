import React, {useCallback, useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks';
import {RequestStatus, LoginFormData} from '../types';
import authActions from '../redux/auth/authActions';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [loginRequestStatus, setLoginRequestStatus] =
    useState<RequestStatus>('idle');
  const loginRequestErrorMessage = useAppSelector(selectAuthErrorMessage);

  const handleSubmitLoginForm = useCallback(
    async (formData: LoginFormData) => {
      try {
        setLoginRequestStatus('loading');
        await dispatch(authActions.loginUser(formData)).unwrap();
        setLoginRequestStatus('succeded');
      } catch (error) {
        setLoginRequestStatus('failed');
      }
    },
    [dispatch],
  );

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <LoginForm onSubmit={handleSubmitLoginForm} />

        <Pressable
          style={styles.navigationLinkContainer}
          onPress={() => navigation.navigate('register')}>
          <Text>Need to register? Press here!</Text>
        </Pressable>
      </SafeView>

      {loginRequestStatus === 'failed' && (
        <Snackbar
          visible
          duration={3000}
          onDismiss={() => setLoginRequestStatus('idle')}>
          {loginRequestErrorMessage}
        </Snackbar>
      )}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  navigationLinkContainer: {
    marginTop: 20,
  },
});
