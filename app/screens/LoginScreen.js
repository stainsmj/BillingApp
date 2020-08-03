import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animation from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch} from 'react-redux';
import {SIGNIN} from '../actions';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [usernameValid, setusernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [datahidden, setdatahidden] = useState(true);
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  const handleSignin = async () => {
    const {email, password} = details;
    //check validity
    //api call
    //get back token
    //catch errors
    let token = null;
    if (email === 'stains' && password === 'abcd') {
      token = 'mycreatedtokenfake';
      try {
        await AsyncStorage.setItem('userToken', token);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Field Empty', 'All the fields must be filled!', [
          {text: 'Okey'},
        ]);
      } else {
        Alert.alert('Invalid User', 'Username or password not correct!', [
          {text: 'Okey'},
        ]);
      }
    }
    dispatch(SIGNIN(email, token));
  };

  const handleEmailChange = (val) => {
    setDetails((preDetails) => ({
      ...preDetails,
      email: val,
    }));

    if (val.trim().length >= 4) {
      setusernameValid(true);
    } else {
      setusernameValid(false);
    }
  };
  const handlePasswordChange = (val) => {
    setDetails((preDetails) => ({
      ...preDetails,
      password: val,
    }));

    if (val.trim().length >= 8) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const updateSecureTextVisible = () => {
    setdatahidden((preData) => !preData);
  };

  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Welcome!</Text>
        </View>
        <Animation.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.textFooter}>Email</Text>
          <View style={styles.action}>
            <FontAwsome color="#05375a" size={20} name="user-o" />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={handleEmailChange}
              value={details.email}
            />
            {details.email.length >= 4 ? (
              <Animation.View animation="bounceIn">
                <Feather color="green" name="check-circle" size={20} />
              </Animation.View>
            ) : null}
          </View>
          {usernameValid ? null : (
            <Animation.Text
              duration={500}
              style={styles.errorMsg}
              animation="fadeInLeft">
              username must be 4 characters long!
            </Animation.Text>
          )}
          <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <Feather color="#05375a" size={20} name="lock" />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              secureTextEntry={datahidden}
              autoCapitalize="none"
              onChangeText={handlePasswordChange}
              value={details.password}
            />
            {datahidden ? (
              <Feather
                color="grey"
                name="eye"
                size={20}
                onPress={updateSecureTextVisible}
              />
            ) : (
              <Feather
                color="grey"
                name="eye-off"
                size={20}
                onPress={updateSecureTextVisible}
              />
            )}
          </View>
          {passwordValid ? null : (
            <Animation.Text
              animation="fadeInLeft"
              duration={500}
              style={styles.errorMsg}>
              password must be 8 characters long!
            </Animation.Text>
          )}
          <View style={styles.button}>
            <TouchableOpacity onPress={handleSignin}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}
              style={[
                styles.signIn,
                {
                  marginTop: 15,
                  borderWidth: 1,
                  borderColor: '#009387',
                },
              ]}>
              <View>
                <Text style={[styles.textSign, {color: '#009387'}]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animation.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    // alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
  },
});
export default LoginScreen;
