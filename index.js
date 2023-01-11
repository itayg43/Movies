import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import 'react-native-get-random-values';

import {store} from './src/redux/store';
import {name as appName} from './app.json';
import App from './App';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
