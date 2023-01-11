import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import SafeView from './SafeView';

interface Props {
  message?: string;
  onTryAgain?: () => void;
}

const ErrorView = ({message = 'Unexpected Error.', onTryAgain}: Props) => {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>{message}</Text>

        {onTryAgain && <Button title="Try Again" onPress={onTryAgain} />}
      </View>
    </SafeView>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
