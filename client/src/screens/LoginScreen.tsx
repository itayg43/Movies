import React, {useCallback, useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks';
import {RequestStatus, LoginFormData} from '../types';
import authActions from '../redux/auth/authActions';
import {selectAuthMessage} from '../redux/auth/authSelectors';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const requestMessage = useAppSelector(selectAuthMessage);

  const handleNavigation = useCallback(() => {
    navigation.navigate('register');
  }, [navigation]);

  const handleDismissSnackbar = useCallback(() => {
    setRequestStatus('idle');
  }, [setRequestStatus]);

  const handleSubmitForm = useCallback(
    async (formData: LoginFormData) => {
      try {
        setRequestStatus('loading');
        await dispatch(authActions.loginUser(formData)).unwrap();
        setRequestStatus('succeded');
      } catch (error) {
        setRequestStatus('failed');
      }
    },
    [dispatch],
  );

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <LoginForm onSubmit={handleSubmitForm} />

        <Pressable
          style={styles.navigationLinkContainer}
          onPress={handleNavigation}>
          <Text>Need to register? Press here!</Text>
        </Pressable>
      </SafeView>

      {requestStatus === 'failed' && (
        <Snackbar visible duration={3000} onDismiss={handleDismissSnackbar}>
          {requestMessage}
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
