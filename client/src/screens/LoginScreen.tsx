import React from 'react';
import {StyleSheet} from 'react-native';

import SafeView from '../components/SafeView';

const LoginScreen = () => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <></>
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
