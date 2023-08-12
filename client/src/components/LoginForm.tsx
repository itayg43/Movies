import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import FormTextInput from '../components/FormTextInput';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSubmit: (formData: LoginFormData) => void;
}

const loginFormSchema = z.object({
  email: z
    .string({required_error: 'Required'})
    .email('Please enter a valid email address'),

  password: z
    .string({required_error: 'Required'})
    .min(4, 'Password should be at least 4 characters long'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = ({contentContainerStyle, onSubmit}: Props) => {
  const {control, handleSubmit} = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleToggleHidePassword = useCallback(() => {
    setHidePassword(currState => !currState);
  }, [setHidePassword]);

  return (
    <View style={contentContainerStyle}>
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
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
});
