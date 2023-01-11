import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import MoviesScreen from '../screens/MoviesScreen';

export type MoviesStackParamList = {
  moviesScreen: undefined;
};

export type MoviesScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParamList,
  'moviesScreen'
>;

const Stack = createNativeStackNavigator<MoviesStackParamList>();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="moviesScreen"
        component={MoviesScreen}
        options={{
          headerTitle: 'Movies',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemUltraThinMaterial',
        }}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
