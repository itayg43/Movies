import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MoviesScreenNavigationProp} from '../navigators/MoviesStackNavigator';
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
import LoadingView from '../components/LoadingView';
import {
  MovieList,
  MovieListHeader,
  MovieListEmptyPlaceholder,
} from '../components/movieList';

const MoviesScreen = () => {
  const isFirstRender = useIsFirstRender();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const movies = useAppSelector(selectMovies);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [getMoviesRequestStatus, setGetMoviesRequestStatus] =
    useState<RequestStatus>('loading');

  const handleGetMovies = useCallback(async () => {
    try {
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
      {getMoviesRequestStatus === 'loading' && <LoadingView />}

      {getMoviesRequestStatus === 'succeded' && (
        <MovieList
          contentContainerStyle={styles.listContainer}
          data={movies}
          onPress={id =>
            navigation.navigate('movieDetails', {
              id,
            })
          }
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
