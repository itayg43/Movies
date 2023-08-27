import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks';
import {LoginFormData} from '../types';
import authActions from '../redux/auth/authActions';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import {LoginForm} from '../components/forms';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const handleSubmitForm = async (formData: LoginFormData) => {
    try {
      await dispatch(authActions.loginUser(formData)).unwrap();
    } catch (error) {}
  };

  const handleNavigationLinkPress = () => {
    navigation.navigate('registerScreen');
  };

  return (
    <SafeView contentContainerStyle={styles.container}>
      <LoginForm onSubmit={handleSubmitForm} />

      <TouchableOpacity
        style={styles.navigationLinkContainer}
        onPress={handleNavigationLinkPress}>
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
