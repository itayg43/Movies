import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {useAppDispatch} from '../hooks/useAppDispatch';
import authAsyncActions from '../redux/auth/authAsyncActions';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {LoginFormData} from '../types';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  const handleSubmitForm = async (formData: LoginFormData) => {
    try {
      await dispatch(authAsyncActions.loginUser(formData)).unwrap();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: authErrorMessage,
        position: 'bottom',
      });
    }
  };

  const handleNavigationLinkPress = () => {
    navigation.replace('registerScreen');
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
    marginTop: 10,
    columnGap: 5,
  },
  navigationLinkText: {
    fontWeight: 'bold',
  },
});
