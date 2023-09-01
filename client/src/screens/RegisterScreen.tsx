import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import authAsyncActions from '../redux/auth/authAsyncActions';
import {RegisterFormData} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';
import {RegisterScreenNavigationProp} from '../navigators/AuthStackNavigator';

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const handleSubmitForm = async (formData: RegisterFormData) => {
    try {
      await dispatch(authAsyncActions.registerUser(formData)).unwrap();
    } catch (error) {}
  };

  const handleNavigationLinkPress = () => {
    navigation.navigate('loginScreen');
  };

  return (
    <SafeView contentContainerStyle={styles.container}>
      <RegisterForm onSubmit={handleSubmitForm} />

      <View style={styles.navigationLinkContainer}>
        <Text>Already have an account?</Text>

        <TouchableOpacity onPress={handleNavigationLinkPress}>
          <Text style={styles.navigationLinkText}>Log In!</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default RegisterScreen;

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
