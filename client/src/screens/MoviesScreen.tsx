import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MoviesScreenNavigationProp} from '../navigators/MoviesStackNavigator';
import {useAppDispatch, useAppSelector} from '../hooks';
import moviesActions from '../redux/movies/moviesActions';
import {updateSearchQuery} from '../redux/movies/moviesSlice';
import {RequestStatus} from '../types';
import {
  selectMovies,
  selectMoviesErrorMessage,
  selectMoviesSearchQuery,
} from '../redux/movies/moviesSelectors';
import SafeView from '../components/SafeView';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import {
  MovieList,
  MovieListSearchBarHeader,
  MovieListEmptySearchResultPlaceholder,
} from '../components/movieList';

const MoviesScreen = () => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const moviesSearchQuery = useAppSelector(selectMoviesSearchQuery);
  const moviesErrorMessage = useAppSelector(selectMoviesErrorMessage);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const handleGetMovies = useCallback(async () => {
    try {
      setRequestStatus('loading');
      await dispatch(moviesActions.getMovies()).unwrap();
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, [dispatch]);

  const handleUpdateMoviesSearchQuery = (value: string) => {
    dispatch(updateSearchQuery(value));
  };

  const handleMovieListItemPress = (id: number) => {
    navigation.navigate('movieDetailsScreen', {
      id,
    });
  };

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <SafeView>
      {requestStatus === 'loading' && (
        <LoadingView message="Loading Movies..." />
      )}

      {requestStatus === 'succeded' && (
        <MovieList
          contentContainerStyle={styles.listContainer}
          data={movies}
          onPress={handleMovieListItemPress}
          listHeaderComponent={
            <MovieListSearchBarHeader
              contentContainerStyle={styles.listHeaderContainer}
              onSearchQueryChange={handleUpdateMoviesSearchQuery}
            />
          }
          listEmptyComponent={
            <MovieListEmptySearchResultPlaceholder
              searchQuery={moviesSearchQuery}
            />
          }
        />
      )}

      {requestStatus === 'failed' && (
        <ErrorView message={moviesErrorMessage} onTryAgain={handleGetMovies} />
      )}
    </SafeView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
  },
  listHeaderContainer: {
    marginBottom: 10,
  },
});
