import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import FormTextInput from './FormTextInput';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSubmit: (formData: RegisterFormData) => void;
}

const registerFormSchema = z
  .object({
    name: z
      .string({required_error: 'Required'})
      .min(2, 'Name should be at least 2 characters long'),

    email: z
      .string({required_error: 'Required'})
      .email('Please enter a valid email address'),

    password: z
      .string({required_error: 'Required'})
      .min(4, 'Password should be at least 4 characters long'),

    confirmPassword: z.string({required_error: 'Required'}),
  })
  .refine(formData => formData.password === formData.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords dont match',
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

const RegisterForm = ({contentContainerStyle, onSubmit}: Props) => {
  const {control, handleSubmit} = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const handleToggleHidePassword = useCallback(() => {
    setHidePassword(currState => !currState);
  }, [setHidePassword]);

  const handleToggleHideConfirmPassword = useCallback(() => {
    setHideConfirmPassword(currState => !currState);
  }, [setHideConfirmPassword]);

  return (
    <View style={contentContainerStyle}>
      {/** name */}
      <FormTextInput
        contentContainerStyle={styles.inputContainer}
        style={styles.input}
        control={control}
        name="name"
        label="Name"
      />

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

      {/** confirm password */}
      <FormTextInput
        contentContainerStyle={styles.inputContainer}
        style={styles.input}
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        autoCapitalize="none"
        secureTextEntry={hideConfirmPassword}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={handleToggleHideConfirmPassword}
          />
        }
      />

      {/** submit */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
});
