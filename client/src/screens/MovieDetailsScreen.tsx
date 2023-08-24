import React from 'react';
import {StyleSheet, View} from 'react-native';
import {} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

import {MovieDetailsScreenRouteProp} from '../navigators/MoviesStackNavigator';

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();

  return <View></View>;
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({});
