import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import authAsyncActions from '../redux/auth/authAsyncActions';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectAuthErrorMessage} from '../redux/auth/authSelectors';
import {RegisterFormData} from '../types';
import SafeView from '../components/SafeView';
import RegisterForm from '../components/RegisterForm';
import {RegisterScreenNavigationProp} from '../navigators/AuthStackNavigator';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const authErrorMessage = useAppSelector(selectAuthErrorMessage);

  const handleSubmitForm = async (formData: RegisterFormData) => {
    try {
      await dispatch(authAsyncActions.registerUser(formData)).unwrap();
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const handleNavigationLinkPress = () => {
    navigation.replace('loginScreen');
  };

  return (
    <>
      <SafeView contentContainerStyle={styles.container}>
        <RegisterForm onSubmit={handleSubmitForm} />

        <View style={styles.navigationLinkContainer}>
          <Text>Already have an account?</Text>

          <TouchableOpacity onPress={handleNavigationLinkPress}>
            <Text style={styles.navigationLinkText}>Log In!</Text>
          </TouchableOpacity>
        </View>
      </SafeView>

      {showErrorMessage && (
        <Snackbar visible onDismiss={() => setShowErrorMessage(false)}>
          {authErrorMessage}
        </Snackbar>
      )}
    </>
  );
};

export default RegisterScreen;

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
