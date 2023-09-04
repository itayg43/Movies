import React, {useCallback, useEffect, useState} from 'react';

import {useAppSelector} from './hooks/useAppSelector';
import {selectAuthUser} from './redux/auth/authSelectors';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import AppBottomTabsNavigator from './navigators/AppBottomTabsNavigator';
import {useAppDispatch} from './hooks/useAppDispatch';
import watchListAsyncActions from './redux/watchList/watchListAsyncActions';
import {RequestStatus} from './types';

const App = () => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(selectAuthUser);

  const [initializeStatus, setInitializeStatus] =
    useState<RequestStatus>('idle');

  const handleGetWatchList = useCallback(async () => {
    try {
      await dispatch(watchListAsyncActions.getWatchList()).unwrap();
      setInitializeStatus('succeded');
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    handleGetWatchList();
  }, [authUser, handleGetWatchList]);

  return (
    <>
      {authUser && initializeStatus === 'succeded' && (
        <AppBottomTabsNavigator />
      )}

      {!authUser && <AuthStackNavigator />}
    </>
  );
};

export default App;
