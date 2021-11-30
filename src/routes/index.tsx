import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens/Home';
import Constants from 'expo-constants';
import { WelcomeScreen } from '../screens/Welcome';

const NativeStack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="Welcome" screenOptions={{
        headerShown: false,
        contentStyle: {paddingTop: Constants.statusBarHeight}
      }}>
        <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
        <NativeStack.Screen name="Home" component={Home} />
      </NativeStack.Navigator>
    </NavigationContainer>
  )
};

export { Routes };