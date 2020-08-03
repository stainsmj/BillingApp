import React from 'react';
import {DarkTheme, DefaultTheme} from './Theme';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import RootNavigators from './navigators';

const App = () => {
  const isDarkTheme = useSelector((state) => state.theme);
  const currentTheme = isDarkTheme ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={currentTheme}>
      <PaperProvider theme={currentTheme}>
        <RootNavigators />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
