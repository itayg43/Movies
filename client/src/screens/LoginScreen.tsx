import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.contentContainer}></View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
