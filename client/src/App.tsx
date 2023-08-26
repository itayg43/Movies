import React from 'react';

import {useAppSelector} from './hooks';
import {selectAuthStatus, selectAuthUser} from './redux/auth/authSelectors';
import {AuthStackNavigator, AppBottomTabsNavigator} from './navigators';

const App = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const authUser = useAppSelector(selectAuthUser);

  return authStatus && authUser ? (
    <AppBottomTabsNavigator />
  ) : (
    <AuthStackNavigator />
  );
};

export default App;
