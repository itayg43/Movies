import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  message: string;
};

const LoadingView = ({message}: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />

      <Text>{message}</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
});
