import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/navigators';
import {name as appName} from './app.json';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

const Root = () => (
  <PaperProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Root);
