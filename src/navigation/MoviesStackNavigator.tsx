import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import MoviesScreen from '../screens/MoviesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

interface MovieDetailsScreenProps {
  id: number;
}

export type MoviesStackParamList = {
  moviesScreen: undefined;
  movieDetailsScreen: MovieDetailsScreenProps | undefined;
};

// movies props
// navigation
export type MoviesScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParamList,
  'moviesScreen'
>;

// movie details props
// navigation
export type MovieDetailsNavigationProp = NativeStackNavigationProp<
  MoviesStackParamList,
  'movieDetailsScreen'
>;

// route
export type MovieDetailsScreenRouteProp = RouteProp<
  MoviesStackParamList,
  'movieDetailsScreen'
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

      <Stack.Screen
        name="movieDetailsScreen"
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
