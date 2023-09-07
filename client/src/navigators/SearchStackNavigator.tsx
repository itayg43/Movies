import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import SearchScreen from '../screens/SearchScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

type SearchStackParams = {
  searchScreen: undefined;
  movieDetailsScreen: {
    id: number;
  };
};

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParams,
  'searchScreen'
>;

export type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParams,
  'movieDetailsScreen'
>;

export type MovieDetailsScreenRouteProp = RouteProp<
  SearchStackParams,
  'movieDetailsScreen'
>;

const Stack = createNativeStackNavigator<SearchStackParams>();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="searchScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="searchScreen" component={SearchScreen} />

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

export default SearchStackNavigator;
