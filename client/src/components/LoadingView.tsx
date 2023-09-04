import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import SafeView from './SafeView';

const LoadingView = () => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <ActivityIndicator size="large" />

      <Text>Loading...</Text>
    </SafeView>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
});
