import React from 'react';
import {StyleSheet} from 'react-native';

import SafeView from '../components/SafeView';

const MoviesScreen = () => {
  return <SafeView contentContainerStyle={styles.container}></SafeView>;
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
