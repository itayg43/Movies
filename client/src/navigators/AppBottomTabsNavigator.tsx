import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MoviesStackNavigator from './MoviesStackNavigator';
import WatchlistScreen from '../screens/WatchlistScreen';

type AppBottomTabsParams = {
  moviesStack: undefined;
  watchlistScreen: undefined;
};

const Tab = createBottomTabNavigator<AppBottomTabsParams>();

const AppBottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="moviesStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="moviesStack"
        component={MoviesStackNavigator}
        options={{
          tabBarLabel: 'Movies',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="movie" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="watchlistScreen"
        component={WatchlistScreen}
        options={{
          tabBarLabel: 'Watch List',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="watch" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabsNavigator;
