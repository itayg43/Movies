import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch, useAppSelector, useDebounce} from '../hooks';
import moviesActions from '../redux/movies/moviesActions';
import {updateSearchQuery} from '../redux/movies/moviesSlice';
import {RequestStatus} from '../types';
import {selectMovies} from '../redux/movies/moviesSelectors';
import SafeView from '../components/SafeView';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import MovieListEmptyPlaceholder from '../components/MovieListEmptyPlaceholder';

const MoviesScreen = () => {
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
    dispatch(updateSearchQuery(debouncedSearchQuery));
  }, [dispatch, debouncedSearchQuery]);

  return (
    <SafeView>
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
  listContainer: {
    paddingHorizontal: 5,
  },
  listHeaderContainer: {
    marginBottom: 10,
  },
});
