import React, {useCallback, useLayoutEffect, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import useDebounce from '../hooks/useDebounce';
import {getMoviesAsync} from '../redux/movies/asyncActions/getMoviesAsync';
import {updateSearchQueryAsync} from '../redux/movies/asyncActions/updateSearchQueryAsync';
import {getSearchResultsAsync} from '../redux/movies/asyncActions/getSearchResultsAsync';
import {
  selectStatus,
  selectErrorMessage,
  selectSearchQuery,
} from '../redux/movies/moviesSelectors';
import {MoviesStatus} from '../redux/movies/moviesSlice';
import {MoviesScreenNavigationProp} from '../navigation/MoviesStackNavigator';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import MoviesContentView from '../components/MoviesContentView';

const MoviesScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const handleTryAgain = useCallback(() => {
    searchQuery === ''
      ? dispatch(getMoviesAsync())
      : dispatch(getSearchResultsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateSearchQueryAsync(debouncedQuery));
  }, [dispatch, debouncedQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setQuery(e.nativeEvent.text),
      },
    });
  }, [navigation]);

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
