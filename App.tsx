import React, {useCallback, useEffect} from 'react';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {useAppSelector} from './src/hooks/useAppSelector';
import {getDataAsync} from './src/redux/app/asyncActions/getDataAsync';
import {selectStatus, selectErrorMessage} from './src/redux/app/appSelectors';
import {AppStatus} from './src/redux/app/appSlice';
import LoadingView from './src/components/LoadingView';
import ErrorView from './src/components/ErrorView';
import MoviesStackNavigator from './src/navigation/MoviesStackNavigator';

const App = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);

  const handleTryAgain = useCallback(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  return (
    <>
      {/** loading */}
      {status === AppStatus.loading && (
        <LoadingView message="Loading Data..." />
      )}

      {/** error */}
      {status === AppStatus.error && (
        <ErrorView message={errorMessage} onTryAgain={handleTryAgain} />
      )}

      {/** content */}
      {status === AppStatus.ready && <MoviesStackNavigator />}
    </>
  );
};

export default App;
