import React, {useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {registerFormSchema} from '../../schemas';
import {RegisterFormData} from '../../types';
import FormTextInput from './FormTextInput';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSubmit: (formData: RegisterFormData) => void;
};

const RegisterForm = ({contentContainerStyle, onSubmit}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleToggleHidePassword = () => {
    setHidePassword(currState => !currState);
  };

  const handleToggleHideConfirmPassword = () => {
    setHideConfirmPassword(currState => !currState);
  };

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
      <Button
        mode="contained"
        loading={isSubmitting}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}>
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
