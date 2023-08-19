import React from 'react';

import {useAppSelector} from './hooks';
import {selectAuthUser} from './redux/auth/authSelectors';
import {AuthStackNavigator, AppBottomTabsNavigator} from './navigators';

const App = () => {
  const user = useAppSelector(selectAuthUser);

  return user ? <AppBottomTabsNavigator /> : <AuthStackNavigator />;
};

export default App;
