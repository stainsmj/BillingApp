import React, {useEffect, useMemo} from 'react';
import {Alert} from 'react-native';

const Navigation = () => {
  const authContext = useMemo(
    () => ({
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
      toggleTheme: () => {
        setIsDarkTheme((theme) => !theme);
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
};
