import React from 'react';

import {useAppSelector} from './hooks/useAppSelector';
import {selectAuthUser} from './redux/auth/authSelectors';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import AppBottomTabsNavigator from './navigators/AppBottomTabsNavigator';

const App = () => {
  const authUser = useAppSelector(selectAuthUser);

  return authUser ? <AppBottomTabsNavigator /> : <AuthStackNavigator />;
};

export default App;
