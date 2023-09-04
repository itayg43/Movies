import React, {useEffect} from 'react';

import {useAppSelector} from './hooks/useAppSelector';
import {selectAuthUser} from './redux/auth/authSelectors';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import AppBottomTabsNavigator from './navigators/AppBottomTabsNavigator';
import {useAppDispatch} from './hooks/useAppDispatch';
import watchListAsyncActions from './redux/watchList/watchListAsyncActions';

const App = () => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    dispatch(watchListAsyncActions.getWatchList());
  }, [dispatch, authUser]);

  return authUser ? <AppBottomTabsNavigator /> : <AuthStackNavigator />;
};

export default App;
