import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from 'react-native-paper';

import HeaderRight from '../components/HomeRightOptions';
//screens
import HomeNavigator from './Home';
import EditScreen from '../screens/EditScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';

import {RETRIEVE_TOKEN, SET_DARK_THEME} from '../actions';

const Stack = createStackNavigator();

export default Navigator = () => {
  const {colors} = useTheme();
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
      console.log('RETRIEVED TOKEN: ', token);
    };
    const checkTheme = async () => {
      let theme = 'DARK';
      try {
        theme_status = await AsyncStorage.getItem('theme');
        if (theme_status) theme = theme_status;
      } catch (err) {
        console.warn(err);
      }
      dispatch(SET_DARK_THEME(theme));
    };
    checkTheme();
    setTimeout(checkToken, 1000);
  }, []);

  if (isLoading) return <ACTIVITY_INDICATOR />;
  else
    return (
      <Stack.Navigator headerMode={userToken ? 'screen' : 'none'}>
        {userToken ? (
          <>
            <Stack.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={({navigation, route}) => {
                return {
                  headerTintColor: colors.text,
                  headerStyle: {
                    backgroundColor: colors.card,
                    elevation: 0,
                  },
                  headerRight: (props) => (
                    <HeaderRight {...props} navigation={navigation} />
                  ),
                };
              }}
            />
            <Stack.Screen name="EditScreen" component={EditScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    );
};

const ACTIVITY_INDICATOR = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
);
