import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/login/index';
import SignUp from './screens/signup/index';
import Dashboard from './screens/dashboard/index';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{title: "Login"}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up"}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard"}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;