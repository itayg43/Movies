import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

type AuthStackParams = {
  login: undefined;
  register: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'login'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'register'
>;

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
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
