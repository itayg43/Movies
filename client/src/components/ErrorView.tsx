import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

import SafeView from './SafeView';

type Props = {
  message: string;
  onRetry?: () => void;
};

const ErrorView = ({message, onRetry}: Props) => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <Text>{message}</Text>

      {onRetry && <Button onPress={onRetry}>Retry</Button>}
    </SafeView>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
});
