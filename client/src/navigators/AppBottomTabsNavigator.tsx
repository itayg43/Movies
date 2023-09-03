import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchScreen from '../screens/SearchScreen';
import ExploreStackNavigator from './ExploreStackNavigator';
import WatchListScreen from '../screens/WatchListScreen';

type AppBottomTabsParams = {
  searchScreen: undefined;
  exploreStackNavigator: undefined;
  watchListScreen: undefined;
};

const Tab = createBottomTabNavigator<AppBottomTabsParams>();

const AppBottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="exploreStackNavigator"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="searchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="movie-search"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="exploreStackNavigator"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: 'Explore',
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
