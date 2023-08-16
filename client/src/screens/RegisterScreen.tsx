import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import authActions from '../redux/auth/authActions';
import {resetAuthStatusAndMessage} from '../redux/auth/authSlice';
import {selectAuthStatus, selectAuthMessage} from '../redux/auth/authSelectors';
import {RegisterFormData} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';
import ErrorSnackbar from '../components/ErrorSnackbar';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);
  const authMessage = useAppSelector(selectAuthMessage);

  const handleRegisterUser = useCallback(
    (formData: RegisterFormData) => {
      dispatch(authActions.registerUserAsync(formData));
    },
    [dispatch],
  );

  const handleDismissSnackbar = useCallback(() => {
    dispatch(resetAuthStatusAndMessage());
  }, [dispatch]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <RegisterForm
        isSubmitting={authStatus === 'loading'}
        onSubmit={handleRegisterUser}
      />

      <ErrorSnackbar
        isVisible={authStatus === 'failed'}
        message={authMessage}
        onDismiss={handleDismissSnackbar}
      />
    </SafeView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
