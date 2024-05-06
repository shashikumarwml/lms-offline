import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Loading from './Loading';
import LoginForm from './auth/Login';
import ContextProvider from '../libs/context';
import Home from './dashboard/Home';

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="loading"
            options={{headerShown: false}}
            component={Loading}
          />
          <Stack.Screen
            name="login"
            options={{headerShown: false}}
            component={LoginForm}
          />
          <Stack.Screen
            name="home"
            options={{headerShown: false}}
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default Root;
