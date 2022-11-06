import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';

import Welcome from './screens/welcomeScreen/index';
import Login from './screens/login/index';
import SignUp from './screens/signup/index';
import DrawerHome from './screens/dashboard/index';
import Card from './components/EmployeeCard';
import AppButton from './components/AppButton';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: "Welcome"}} />
        <Stack.Screen name="Login" component={Login} options={{title: "Login"}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up"}} />
        <Stack.Screen name="DrawerHome" component={DrawerHome} options={{ title: "DrawerHome"}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;