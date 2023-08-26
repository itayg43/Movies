import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import MoviesScreen from '../screens/MoviesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

type MoviesStackParams = {
  moviesScreen: undefined;
  movieDetailsScreen: {
    id: number;
  };
};

export type MoviesScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParams,
  'moviesScreen'
>;

export type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParams,
  'movieDetailsScreen'
>;

export type MovieDetailsScreenRouteProp = RouteProp<
  MoviesStackParams,
  'movieDetailsScreen'
>;

const Stack = createNativeStackNavigator<MoviesStackParams>();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="moviesScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="moviesScreen" component={MoviesScreen} />

      <Stack.Screen
        name="movieDetailsScreen"
        component={MovieDetailsScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
