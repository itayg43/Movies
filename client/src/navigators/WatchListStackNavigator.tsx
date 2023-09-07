import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import WatchListScreen from '../screens/WatchListScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

type WatchListStackParams = {
  watchListScreen: undefined;
  movieDetailsScreen: {
    id: number;
  };
};

export type WatchListScreenNavigationProp = NativeStackNavigationProp<
  WatchListStackParams,
  'watchListScreen'
>;

export type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  WatchListStackParams,
  'movieDetailsScreen'
>;

export type MovieDetailsScreenRouteProp = RouteProp<
  WatchListStackParams,
  'movieDetailsScreen'
>;

const Stack = createNativeStackNavigator<WatchListStackParams>();

const WatchListStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="watchListScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="watchListScreen" component={WatchListScreen} />

      <Stack.Screen
        name="movieDetailsScreen"
        component={MovieDetailsScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default WatchListStackNavigator;
