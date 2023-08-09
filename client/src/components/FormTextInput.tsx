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
  const {field, fieldState} = useController({control, name});

  return (
    <View style={contentContainerStyle}>
      <TextInput
        value={field.value}
        error={fieldState.error?.message ? true : false}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        {...restProps}
      />

      {fieldState.error?.message && (
        <HelperText type="error">{fieldState.error.message}</HelperText>
      )}
    </View>
  );
};

export default FormTextInput;
