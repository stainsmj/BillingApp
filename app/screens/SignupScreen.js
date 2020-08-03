import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TextInput,
  StatusBar,
} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animation from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {SIGNUP} from '../actions';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [datahidden, setdatahidden] = useState(true);
  const [confirmdatahidden, setconfirmdatahidden] = useState(true);
  const [datavalid, setvalid] = useState(false);
  const [details, setDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
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
    dispatch(SIGNUP(details.email, token));
  };

  const handleEmailChange = (val) => {
    setDetails((preDetails) => ({
      ...preDetails,
      email: val,
    }));
    if (val.length > 0) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };
  const handlePasswordChange = (val) => {
    setDetails((preDetails) => ({
      ...preDetails,
      password: val,
    }));
  };
  const handleConfirmPasswordChange = (val) => {
    setDetails((preDetails) => ({
      ...preDetails,
      confirmPassword: val,
    }));
  };
  const updateSecureTextVisible = () => {
    setdatahidden((preData) => !preData);
  };
  const updateConfirmSecureTextVisible = () => {
    setconfirmdatahidden((preData) => !preData);
  };
  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Register Now!</Text>
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
            {datavalid ? (
              <Animation.View animation="bounceIn">
                <Feather color="green" name="check-circle" size={20} />
              </Animation.View>
            ) : null}
          </View>
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
          <Text style={[styles.textFooter, {marginTop: 35}]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather color="#05375a" size={20} name="lock" />
            <TextInput
              placeholder="Confirm Password"
              style={styles.textInput}
              secureTextEntry={confirmdatahidden}
              autoCapitalize="none"
              onChangeText={handleConfirmPasswordChange}
              value={details.confirmPassword}
            />
            {confirmdatahidden ? (
              <Feather
                color="grey"
                name="eye"
                size={20}
                onPress={updateConfirmSecureTextVisible}
              />
            ) : (
              <Feather
                color="grey"
                name="eye-off"
                size={20}
                onPress={updateConfirmSecureTextVisible}
              />
            )}
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={handleSignUp}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                  Sign In
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
});
export default LoginScreen;
