import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {LoginFormData} from '../types';
import authAsyncActions from '../redux/auth/authAsyncActions';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const handleSubmitForm = async (formData: LoginFormData) => {
    try {
      await dispatch(authAsyncActions.loginUser(formData)).unwrap();
    } catch (error) {}
  };

  const handleNavigationLinkPress = () => {
    navigation.navigate('registerScreen');
  };

  return (
    <SafeView contentContainerStyle={styles.container}>
      <LoginForm onSubmit={handleSubmitForm} />

      <View style={styles.navigationLinkContainer}>
        <Text>Don't have an account?</Text>

        <TouchableOpacity onPress={handleNavigationLinkPress}>
          <Text style={styles.navigationLinkText}>Create one!</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  navigationLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 5,
  },
  navigationLinkText: {
    fontWeight: 'bold',
  },
});
