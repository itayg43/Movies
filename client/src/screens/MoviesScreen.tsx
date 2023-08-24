import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useIsFirstRender,
} from '../hooks';
import moviesActions from '../redux/movies/moviesActions';
import {updateSearchQuery} from '../redux/movies/moviesSlice';
import {RequestStatus} from '../types';
import {selectMovies} from '../redux/movies/moviesSelectors';
import SafeView from '../components/SafeView';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import MovieListEmptyPlaceholder from '../components/MovieListEmptyPlaceholder';

const MoviesScreen = () => {
  const isFirstRender = useIsFirstRender();

  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [getMoviesRequestStatus, setGetMoviesRequestStatus] =
    useState<RequestStatus>('idle');

  const handleGetMovies = useCallback(async () => {
    try {
      setGetMoviesRequestStatus('loading');
      await dispatch(moviesActions.getMovies()).unwrap();
      setGetMoviesRequestStatus('succeded');
    } catch (error) {
      setGetMoviesRequestStatus('failed');
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    dispatch(updateSearchQuery(debouncedSearchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, debouncedSearchQuery]);

  return (
    <SafeView>
      {getMoviesRequestStatus === 'loading' && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />

          <Text>Loading...</Text>
        </View>
      )}

      {getMoviesRequestStatus === 'succeded' && (
        <MovieList
          contentContainerStyle={styles.listContainer}
          data={movies}
          listHeaderComponent={
            <MovieListHeader
              contentContainerStyle={styles.listHeaderContainer}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          }
          listEmptyComponent={
            <MovieListEmptyPlaceholder searchQuery={searchQuery} />
          }
        />
      )}
    </SafeView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  listContainer: {
    paddingHorizontal: 5,
  },
  listHeaderContainer: {
    marginBottom: 10,
  },
});
