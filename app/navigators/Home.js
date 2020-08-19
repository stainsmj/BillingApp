import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//screens
import HomeScreen from '../screens/HomeScreen';
import PrintScreen from '../screens/PrintScreen';
import {useTheme} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const currentTheme = useTheme();
  const {colors} = currentTheme;

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12, color: colors.text},
        style: {
          backgroundColor: colors.card,
          elevation: 0,
        },
        indicatorStyle: {
          backgroundColor: colors.text,
        },
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="PrintScreen" component={PrintScreen} />
    </Tab.Navigator>
  );
};

export default Home;
