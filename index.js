import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

const RootApp = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => RootApp);
