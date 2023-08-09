import React, {useCallback} from 'react';
import {StyleSheet, Alert} from 'react-native';

import authService from '../services/authService';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import SafeView from '../components/SafeView';
import LoginForm, {LoginFormData} from '../components/LoginForm';

const LoginScreen = () => {
  const handleLoginUser = useCallback(async (formData: LoginFormData) => {
    try {
      await authService.loginUser(formData.email, formData.password);
    } catch (error) {
      Alert.alert('Error', errorHandlerUtil.extractMessage(error));
    }
  }, []);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <LoginForm onSubmit={handleLoginUser} />
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
