import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Routes  } from './src/routes';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';
import { theme } from './src/global/style';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.background}/>
      <Routes />
    </>
  );
}


