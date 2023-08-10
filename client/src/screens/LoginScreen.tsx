import React, {useCallback} from 'react';
import {StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import authService from '../services/authService';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import SafeView from '../components/SafeView';
import LoginForm, {LoginFormData} from '../components/LoginForm';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleNavigation = useCallback(() => {
    navigation.navigate('register');
  }, [navigation]);

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

      <TouchableOpacity
        style={styles.navigationLinkContainer}
        onPress={handleNavigation}>
        <Text>Need to register? Press here!</Text>
      </TouchableOpacity>
    </SafeView>
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
