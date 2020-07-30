import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  navigation.setOptions({
    headerTintColor: '#eee',
    headerStyle: {
      backgroundColor: '#000',
    },
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12, color: '#eee'},
        style: {backgroundColor: '#000'},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Print" component={PrintScreen} />
    </Tab.Navigator>
  );
};

export default Home;

//test
const HomeScreen = ({navigation}) => (
  <View>
    <Text>Home</Text>
    <Button title="PRINT" onPress={() => navigation.navigate('Print')} />
    <Button title="EDIT" onPress={() => navigation.navigate('EditStore')} />
  </View>
);
const PrintScreen = ({navigation}) => (
  <View>
    <Text>Print</Text>
  </View>
);
