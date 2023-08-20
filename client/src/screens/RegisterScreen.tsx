import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../hooks';
import authActions from '../redux/auth/authActions';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {RegisterFormData, RequestStatus} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const [registerRequestStatus, setRegisterRequestStatus] =
    useState<RequestStatus>('idle');
  const registerRequestErrorMessage = useAppSelector(selectAuthErrorMessage);

  const handleSubmitRegisterForm = useCallback(
    async (formData: RegisterFormData) => {
      try {
        setRegisterRequestStatus('loading');
        await dispatch(authActions.registerUser(formData)).unwrap();
        setRegisterRequestStatus('succeded');
      } catch (error) {
        setRegisterRequestStatus('failed');
      }
    },
    [dispatch],
  );

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <RegisterForm onSubmit={handleSubmitRegisterForm} />
      </SafeView>

      {registerRequestStatus === 'failed' && (
        <Snackbar
          visible
          duration={3000}
          onDismiss={() => setRegisterRequestStatus('idle')}>
          {registerRequestErrorMessage}
        </Snackbar>
      )}
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
