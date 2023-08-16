import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import authActions from '../redux/auth/authActions';
import {selectAuthStatus, selectAuthMessage} from '../redux/auth/authSelectors';
import {LoginFormData} from '../types';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const authStatus = useAppSelector(selectAuthStatus);
  const authMessage = useAppSelector(selectAuthMessage);

  const handleNavigation = useCallback(() => {
    navigation.navigate('register');
  }, [navigation]);

  const handleLoginUser = useCallback(
    (formData: LoginFormData) => {
      dispatch(authActions.loginUserAsync(formData));
    },
    [dispatch],
  );

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
