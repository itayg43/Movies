import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import authAsyncActions from '../redux/auth/authAsyncActions';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {LoginFormData, RequestStatus} from '../types';
import {LoginScreenNavigationProp} from '../navigators/AuthStackNavigator';
import SafeView from '../components/SafeView';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [authStatus, setAuthStatus] = useState<RequestStatus>('idle');
  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  const handleSubmitForm = async (formData: LoginFormData) => {
    try {
      setAuthStatus('loading');
      await dispatch(authAsyncActions.loginUser(formData)).unwrap();
      setAuthStatus('succeded');
    } catch (error) {
      setAuthStatus('failed');
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

      {authStatus === 'failed' && <>{Alert.alert('Error', authErrorMessage)}</>}
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
