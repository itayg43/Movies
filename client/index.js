import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import App from './src/App';
import {name as appName} from './app.json';
import store from './src/redux/store';

const theme = {
  ...DefaultTheme,
  roundness: 1,
};

const RootApp = () => {
  return (
    <PaperProvider theme={theme}>
      <StoreProvider store={store}>
        <NavigationContainer>
          <FlipperAsyncStorage />
          <App />
        </NavigationContainer>
      </StoreProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
