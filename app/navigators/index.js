import React, {useEffect, useMemo, useReducer} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Alert} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
//screens
import HomeNavigator from './Home';
import EditScreen from '../screens/EditScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
//context
import {AuthContext} from '../components/context';

const Stack = createStackNavigator();

const Navigation = () => {
  const initialState = {
    isLoading: true,
    userToken: null,
    userName: null,
  };

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...state,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...state,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      default:
        return {...state};
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        //check validity
        //api call
        //get back token
        //catch errors
        let token = null;
        if (username === 'stains' && password === 'abcd') {
          token = 'mycreatedtokenfake';
          try {
            await AsyncStorage.setItem('userToken', token);
          } catch (err) {
            console.log(err);
          }
        } else {
          if (username.length === 0 || password.length === 0) {
            Alert.alert('Field Empty', 'All the fields must be filled!', [
              {text: 'Okey'},
            ]);
          } else {
            Alert.alert('Invalid User', 'Username or password not correct!', [
              {text: 'Okey'},
            ]);
          }
        }
        dispatch({
          type: 'LOGIN',
          id: username,
          token,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (err) {
          console.log(err);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: async (username, password) => {
        //check validity
        //api calls goes here...
        //register new user
        //get back token
        //catch erros
        let token = null;
        token = 'mycreatedtokenfake';
        try {
          await AsyncStorage.setItem('userToken', token);
        } catch (err) {
          console.log(err);
        }

        dispatch({
          type: 'REGISTER',
          id: username,
          token,
        });
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: 'RETRIEVE_TOKEN',
        token,
      });
    }, 1000);
  }, []);
  if (loginState.isLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? <AuthStack /> : <RootStack />}
    </AuthContext.Provider>
  );
};

export default Navigation;

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
