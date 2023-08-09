import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import authService from '../services/authService';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import SafeView from '../components/SafeView';

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
    formState: {isDirty, isValid, errors},
  } = useForm<LoginFormData>({resolver: zodResolver(loginFormSchema)});

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
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />

        {errors.email?.message && (
          <HelperText type="error">{errors.email?.message}</HelperText>
        )}
      </View>

      {/** password */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              secureTextEntry
            />
          )}
        />

        {errors.password?.message && (
          <HelperText type="error">{errors.password?.message}</HelperText>
        )}
      </View>

      {/** submit */}
      <Button
        mode="contained"
        disabled={!isDirty || !isValid}
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
