import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import App from './src/App';
import {name as appName} from './app.json';

const RootApp = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
