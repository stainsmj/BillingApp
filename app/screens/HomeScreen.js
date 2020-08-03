import React from 'react';
import {View, Text, Button, StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const currentTheme = useTheme();
  return (
    <>
      <StatusBar
        barStyle={currentTheme.dark ? 'light-content' : 'dark-content'}
      />
      <View>
        <Text>Home Screen</Text>
      </View>
    </>
  );
};

export default HomeScreen;
