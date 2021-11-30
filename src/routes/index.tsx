import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens/Home';
import Constants from 'expo-constants';

const NativeStack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        contentStyle: {paddingTop: Constants.statusBarHeight}
      }}>
        <NativeStack.Screen name="Home" component={Home} />
      </NativeStack.Navigator>
    </NavigationContainer>
  )
};

export { Routes };