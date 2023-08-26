import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';

type Props = {
  message: string;
  onTryAgain?: () => void;
};

const ErrorView = ({message, onTryAgain}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>

      {onTryAgain && <Button onPress={onTryAgain}>Try Again</Button>}
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
});
