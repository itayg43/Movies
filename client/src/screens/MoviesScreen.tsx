import React from 'react';
import {StyleSheet, Text} from 'react-native';

import SafeView from '../components/SafeView';

const MoviesScreen = () => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <Text>Movies</Text>
    </SafeView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
