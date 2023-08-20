import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {PersistGate} from 'redux-persist/integration/react';

import App from './src/App';
import {name as appName} from './app.json';
import store, {persistedStore} from './src/redux/store';
import apiClientInterceptors from './src/interceptors/apiClientInterceptors';

apiClientInterceptors.setup(store.dispatch);

const theme = {
  ...DefaultTheme,
  roundness: 1,
};

const RootApp = () => {
  return (
    <PaperProvider theme={theme}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <NavigationContainer>
            <FlipperAsyncStorage />
            <App />
          </NavigationContainer>
        </PersistGate>
      </StoreProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
