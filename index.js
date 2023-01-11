import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-get-random-values';

import {store} from './src/redux/store';
import {name as appName} from './app.json';
import App from './App';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
