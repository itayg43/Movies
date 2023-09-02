import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MoviesScreen from '../screens/MoviesScreen';
import WatchListScreen from '../screens/WatchListScreen';

type AppBottomTabsParams = {
  moviesScreen: undefined;
  watchListScreen: undefined;
};

const Tab = createBottomTabNavigator<AppBottomTabsParams>();

const AppBottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="moviesScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="moviesScreen"
        component={MoviesScreen}
        options={{
          tabBarLabel: 'Movies',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="movie-filter"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="watchListScreen"
        component={WatchListScreen}
        options={{
          tabBarLabel: 'Watch List',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="movie-open-edit"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabsNavigator;
