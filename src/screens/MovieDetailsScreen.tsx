import React, {useCallback, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {MovieDetailsScreenRouteProp} from '../navigation/MoviesStackNavigator';
import {getMovieDetailsAsync} from '../redux/movie/asyncActions/getMovieDetailsAsync';
import {selectErrorMessage, selectStatus} from '../redux/movie/movieSelectors';
import {MovieStatus} from '../redux/movie/movieSlice';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import MovieDetailsContentView from '../components/movies/MovieDetailsContentView';

const MovieDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const id = route.params?.id;
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);

  const getMovieDetails = useCallback(() => {
    if (id) {
      dispatch(getMovieDetailsAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  return (
    <>
      {/** loading */}
      {status === MovieStatus.loading && (
        <LoadingView message="Loading Details..." />
      )}

      {/** error */}
      {status === MovieStatus.error && (
        <ErrorView message={errorMessage} onTryAgain={getMovieDetails} />
      )}

      {/** content */}
      {status === MovieStatus.idle && <MovieDetailsContentView />}
    </>
  );
};

export default MovieDetailsScreen;
