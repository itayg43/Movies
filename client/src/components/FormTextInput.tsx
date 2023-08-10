import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TextInput, TextInputProps, HelperText} from 'react-native-paper';
import {useController} from 'react-hook-form';

interface Props extends TextInputProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  control: any;
  name: string;
}

const FormTextInput = ({
  contentContainerStyle,
  control,
  name,
  ...restProps
}: Props) => {
  const {
    field: {value, onChange, onBlur},
    fieldState: {invalid, error},
  } = useController({control, name});

  return (
    <View style={contentContainerStyle}>
      <TextInput
        value={value}
        error={invalid}
        onChangeText={onChange}
        onBlur={onBlur}
        {...restProps}
      />

      {invalid && <HelperText type="error">{error?.message}</HelperText>}
    </View>
  );
};

export default FormTextInput;
