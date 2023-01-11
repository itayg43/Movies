import React, {useCallback} from 'react';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {getMoviesAsync} from '../redux/movies/asyncActions/getMoviesAsync';
import {
  selectStatus,
  selectErrorMessage,
} from '../redux/movies/moviesSelectors';
import {MoviesStatus} from '../redux/movies/moviesSlice';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import MoviesContentView from '../components/MoviesContentView';

const MoviesScreen = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);

  const handleTryAgain = useCallback(() => {
    dispatch(getMoviesAsync());
  }, [dispatch]);

  return (
    <>
      {/** loading */}
      {status === MoviesStatus.loading && (
        <LoadingView message="Loading Movies..." />
      )}

      {/** error */}
      {status === MoviesStatus.error && (
        <ErrorView message={errorMessage} onTryAgain={handleTryAgain} />
      )}

      {/** content */}
      {status === MoviesStatus.idle && <MoviesContentView />}
    </>
  );
};

export default MoviesScreen;
