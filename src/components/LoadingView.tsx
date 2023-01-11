import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

import SafeView from './SafeView';

interface Props {
  message?: string;
}

const LoadingView = ({message = 'Loading...'}: Props) => {
  return (
    <SafeView>
      <View style={styles.container}>
        <ActivityIndicator />

        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeView>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 10,
  },
});
