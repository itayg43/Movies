import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchStackNavigator from './SearchStackNavigator';
import ExploreStackNavigator from './ExploreStackNavigator';
import WatchListStackNavigator from './WatchListStackNavigator';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectWatchList} from '../redux/watchList/watchListSelectors';

type AppBottomTabsParams = {
  searchStackNavigator: undefined;
  exploreStackNavigator: undefined;
  watchListStackNavigator: undefined;
};

const Tab = createBottomTabNavigator<AppBottomTabsParams>();

const AppBottomTabsNavigator = () => {
  const watchList = useAppSelector(selectWatchList);

  return (
    <Tab.Navigator
      initialRouteName="exploreStackNavigator"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="searchStackNavigator"
        component={SearchStackNavigator}
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
        name="watchListStackNavigator"
        component={WatchListStackNavigator}
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
          tabBarBadge: watchList.length,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabsNavigator;
