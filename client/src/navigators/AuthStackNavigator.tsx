import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

type AuthStackParams = {
  login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
