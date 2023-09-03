import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import ExploreScreen from '../screens/ExploreScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

type ExploreStackParams = {
  exploreScreen: undefined;
  movieDetailsScreen: {
    id: number;
  };
};

export type ExploreScreenNavigationProp = NativeStackNavigationProp<
  ExploreStackParams,
  'exploreScreen'
>;

export type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  ExploreStackParams,
  'movieDetailsScreen'
>;

export type MovieDetailsScreenRouteProp = RouteProp<
  ExploreStackParams,
  'movieDetailsScreen'
>;

const Stack = createNativeStackNavigator<ExploreStackParams>();

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="exploreScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="exploreScreen" component={ExploreScreen} />

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

export default ExploreStackNavigator;
