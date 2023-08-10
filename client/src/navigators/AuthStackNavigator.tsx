import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

type AuthStackParams = {
  login: undefined;
  register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="register">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
        }}
      />

      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          headerTitle: 'Register',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
