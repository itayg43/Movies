import React, {useCallback} from 'react';
import {StyleSheet, Alert} from 'react-native';

import authService from '../services/authService';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import SafeView from '../components/SafeView';
import RegisterForm, {RegisterFormData} from '../components/RegisterForm';

const RegisterScreen = () => {
  const handleRegisterUser = useCallback(async (formData: RegisterFormData) => {
    try {
      await authService.registerUser(formData);
    } catch (error) {
      Alert.alert('Error', errorHandlerUtil.extractMessage(error));
    }
  }, []);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <RegisterForm onSubmit={handleRegisterUser} />
    </SafeView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
