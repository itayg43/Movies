import React, {useState} from 'react';
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
  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const handleSubmitForm = async (formData: RegisterFormData) => {
    try {
      await dispatch(authActions.registerUser(formData)).unwrap();
    } catch (error) {
      setRequestStatus('failed');
    }
  };

  const handleDismissSnackbar = () => {
    setRequestStatus('idle');
  };

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <RegisterForm onSubmit={handleSubmitForm} />
      </SafeView>

      {requestStatus === 'failed' && (
        <Snackbar visible onDismiss={handleDismissSnackbar}>
          {authErrorMessage}
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
