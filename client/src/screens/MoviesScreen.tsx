import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks';
import moviesActions from '../redux/movies/moviesActions';
import {RequestStatus} from '../types';
import SafeView from '../components/SafeView';

const MoviesScreen = () => {
  const dispatch = useAppDispatch();

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

  return <SafeView contentContainerStyle={styles.container}></SafeView>;
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
