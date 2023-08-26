import React from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks';
import authActions from '../redux/auth/authActions';
import {RegisterFormData} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm = async (formData: RegisterFormData) => {
    try {
      await dispatch(authActions.registerUser(formData)).unwrap();
    } catch (error) {}
  };

  return (
    <SafeView contentContainerStyle={styles.container}>
      <RegisterForm onSubmit={handleSubmitForm} />
    </SafeView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
