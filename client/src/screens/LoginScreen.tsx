import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import authService from '../services/authService';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import SafeView from '../components/SafeView';
import FormTextInput from '../components/FormTextInput';

const loginFormSchema = z.object({
  email: z
    .string({required_error: 'Required'})
    .email('Please enter a valid email address'),

  password: z
    .string({required_error: 'Required'})
    .min(4, 'Password should be at least 4 characters long'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<LoginFormData>({resolver: zodResolver(loginFormSchema)});

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleToggleHidePassword = useCallback(() => {
    setHidePassword(currState => !currState);
  }, [setHidePassword]);

  const handleLoginUser = useCallback(async (formData: LoginFormData) => {
    try {
      const data = await authService.loginUser(
        formData.email,
        formData.password,
      );
      console.log(data);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      console.log(message);
    }
  }, []);

  return (
    <SafeView contentContainerStyle={styles.container}>
      {/** email */}
      <FormTextInput
        contentContainerStyle={styles.inputContainer}
        style={styles.input}
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** password */}
      <FormTextInput
        contentContainerStyle={styles.inputContainer}
        style={styles.input}
        control={control}
        name="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        right={<TextInput.Icon icon="eye" onPress={handleToggleHidePassword} />}
      />

      {/** submit */}
      <Button
        mode="contained"
        disabled={!isValid}
        onPress={handleSubmit(handleLoginUser)}>
        Submit
      </Button>
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
});
