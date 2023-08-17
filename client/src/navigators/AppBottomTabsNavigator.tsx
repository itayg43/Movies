import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import MoviesScreen from '../screens/MoviesScreen';

type AppBottomTabsParams = {
  movies: undefined;
};

export type MoviesScreenNavigationProp = BottomTabNavigationProp<
  AppBottomTabsParams,
  'movies'
>;

const Tab = createBottomTabNavigator<AppBottomTabsParams>();

const AppBottomTabsNavigator = () => {
  <Tab.Navigator>
    <Tab.Screen name="movies" component={MoviesScreen} />
  </Tab.Navigator>;
};

export default AppBottomTabsNavigator;
