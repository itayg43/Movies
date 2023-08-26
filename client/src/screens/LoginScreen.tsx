import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks';
import {RequestStatus, LoginFormData} from '../types';
import authActions from '../redux/auth/authActions';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const dispatch = useAppDispatch();
  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const handleSubmitForm = async (formData: LoginFormData) => {
    try {
      await dispatch(authActions.loginUser(formData)).unwrap();
    } catch (error) {
      setRequestStatus('failed');
    }
  };

  const handleNavigationLinkPress = () => {
    navigation.navigate('registerScreen');
  };

  const handleDismissSnackbar = () => {
    setRequestStatus('idle');
  };

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <LoginForm onSubmit={handleSubmitForm} />

        <TouchableOpacity
          style={styles.navigationLinkContainer}
          onPress={handleNavigationLinkPress}>
          <Text>Need to register? Press here!</Text>
        </TouchableOpacity>
      </SafeView>

      {requestStatus === 'failed' && (
        <Snackbar visible onDismiss={handleDismissSnackbar}>
          {authErrorMessage}
        </Snackbar>
      )}
    </>
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
