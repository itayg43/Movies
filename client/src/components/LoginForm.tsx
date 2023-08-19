import React, {useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {loginFormSchema} from '../schemas';
import {LoginFormData} from '../types';
import FormTextInput from '../components/FormTextInput';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSubmit: (formData: LoginFormData) => void;
};

const LoginForm = ({contentContainerStyle, onSubmit}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const [hidePassword, setHidePassword] = useState<boolean>(true);

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
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHidePassword(currState => !currState)}
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

export default LoginForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
});
