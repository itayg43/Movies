import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />

      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
