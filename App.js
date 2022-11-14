import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// define REM depending on screen width
const {height} = Dimensions.get('window');
const rem = parseInt(height * 18 / 900);


import Login from './screens/login/index';
import SignUp from './screens/signup/index';
import Dashboard from './screens/dashboard/index';
import Recording from './screens/recording/index'
import Setting from './screens/setting/index';;

const Stack = createNativeStackNavigator();


// calc styles
EStyleSheet.build({
  $rem: rem,
});

const App = () => {
  console.log('global vars', EStyleSheet.globalVars);
  console.log('rem', rem);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{title: "Login"}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up"}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard"}} />
        <Stack.Screen name="Recording" component={Recording} options={{ title: "Flash Card"}} />
        <Stack.Screen name="Setting" component={Setting} options={{ title: "Setting"}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;