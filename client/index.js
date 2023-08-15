import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import App from './src/App';
import {name as appName} from './app.json';

const theme = {
  ...DefaultTheme,
  roundness: 1,
};

const RootApp = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <FlipperAsyncStorage />
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
