import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

//screens
import HomeNavigator from './Home';
import EditScreen from '../screens/EditScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';

import {RETRIEVE_TOKEN} from '../actions';

const Stack = createStackNavigator();

export default Navigator = () => {
  const dispatch = useDispatch();
  const {isLoading, userToken} = useSelector((state) => state.auth);

  useEffect(() => {
    const checkToken = async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      dispatch(RETRIEVE_TOKEN(token));
      console.log(token);
    };
    setTimeout(checkToken, 1000);
  }, []);

  if (isLoading) return <ACTIVITY_INDICATOR />;
  else if (userToken !== null) return <AuthStack />;
  else return <RootStack />;
};

const ACTIVITY_INDICATOR = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
);

const RootStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator headerMode="float">
    <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
    <Stack.Screen name="EditScreen" component={EditScreen} />
  </Stack.Navigator>
);
