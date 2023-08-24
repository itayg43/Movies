import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch, useAppSelector} from '../hooks';
import moviesActions from '../redux/movies/moviesActions';
import {RequestStatus} from '../types';
import {selectMovies} from '../redux/movies/moviesSelectors';
import SafeView from '../components/SafeView';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';

const MoviesScreen = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <SafeView contentContainerStyle={styles.container}>
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
        />
      )}
    </SafeView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {},

  listContainer: {
    paddingHorizontal: 5,
  },
  listHeaderContainer: {
    marginBottom: 10,
  },
});
