import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import MoviesScreen from '../screens/MoviesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

type MoviesStackParams = {
  movies: undefined;
  movieDetails: {
    id: number;
  };
};

export type MoviesScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParams,
  'movies'
>;

export type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParams,
  'movieDetails'
>;

export type MovieDetailsScreenRouteProp = RouteProp<
  MoviesStackParams,
  'movieDetails'
>;

const Stack = createNativeStackNavigator<MoviesStackParams>();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="movies"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="movies" component={MoviesScreen} />

      <Stack.Screen
        name="movieDetails"
        component={MovieDetailsScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
