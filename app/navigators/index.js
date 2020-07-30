import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import HomeNavigator from './Home';

const Navigation = () => {
  const Stack = createStackNavigator();
  const [token, setToken] = useState(null);
  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
          <Stack.Screen name="EditStore" component={EditStore} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;

//test files
const Login = ({navigation}) => (
  <View>
    <Text>LoginScreen</Text>
    <Button title="SIGNIN" onPress={() => navigation.navigate('Signin')} />
    <Button
      title="FORGOTPASSWORD"
      onPress={() => navigation.navigate('ForgotPassword')}
    />
    <Button
      title="LOGIN..."
      onPress={() => navigation.navigate('HomeNavigator')}
    />
  </View>
);
const Signin = ({navigation}) => (
  <View>
    <Text>Signin</Text>
    <Button
      title="SIGNIN"
      onPress={() => navigation.navigate('HomeNavigator')}
    />

    <Button title="LOGIN" onPress={() => navigation.navigate('Login')} />
    <Button
      title="FORGOTPASSWORD"
      onPress={() => navigation.navigate('ForgotPassword')}
    />
  </View>
);
const ForgotPassword = ({navigation}) => (
  <View>
    <Text>ForgotPassword</Text>
  </View>
);

const EditStore = ({navigation}) => (
  <View>
    <Text>EditStore</Text>
    <Button title="Home" onPress={() => navigation.navigate('HomeNavigator')} />
  </View>
);
