import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../hooks';
import authActions from '../redux/auth/authActions';
import {selectAuthMessage} from '../redux/auth/authSelectors';
import {RegisterFormData, RequestStatus} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const requestMessage = useAppSelector(selectAuthMessage);

  const handleDismissSnackbar = useCallback(() => {
    setRequestStatus('idle');
  }, [setRequestStatus]);

  const handleSubmitForm = useCallback(
    async (formData: RegisterFormData) => {
      try {
        setRequestStatus('loading');
        await dispatch(authActions.registerUser(formData)).unwrap();
        setRequestStatus('succeded');
      } catch (error) {
        setRequestStatus('failed');
      }
    },
    [dispatch],
  );

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <RegisterForm
          isSubmitting={requestStatus === 'loading'}
          onSubmit={handleSubmitForm}
        />
      </SafeView>

      {requestStatus === 'failed' && (
        <Snackbar visible duration={3000} onDismiss={handleDismissSnackbar}>
          {requestMessage}
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
