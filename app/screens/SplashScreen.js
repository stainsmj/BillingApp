import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animation from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Animation.Image
            animation="bounceIn"
            duration={1500}
            style={styles.logo}
            source={require('../assets/logo-ticktok.png')}
            resizeMode="stretch"
          />
        </View>
        <Animation.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.title}>Stay connected with everyone!</Text>
          <Text style={styles.text}>Sign in with new account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Get started!</Text>
                <Icon name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animation.View>
      </View>
    </>
  );
};

const {height} = Dimensions.get('screen');
const HEIGHT_LOGO = height * 0.28;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009387',
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  logo: {
    width: HEIGHT_LOGO,
    height: HEIGHT_LOGO,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
