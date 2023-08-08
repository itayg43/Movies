import {AppRegistry} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';

const RootApp = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => RootApp);
