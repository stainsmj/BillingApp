import React, {useState, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {Menu, Divider} from 'react-native-paper';
import {AuthContext} from '../components/context';
//screens
import HomeScreen from '../screens/HomeScreen';
import PrintScreen from '../screens/PrintScreen';
import {useTheme} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {SIGNOUT, TOGGLE_THEME} from '../actions';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const currentTheme = useTheme();
  const [visible, setVisible] = useState(false);

  // const {signOut, toggleTheme} = useContext(AuthContext);

  const signOut = () => {
    dispatch(SIGNOUT());
  };
  const toggleTheme = () => {
    dispatch(TOGGLE_THEME());
    console.log();
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  navigation.setOptions({
    // headerTintColor: '#eee',
    headerStyle: {
      // backgroundColor: '#000',
    },
    headerRight: (props) => (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Icon
            onPress={openMenu}
            name="more-vertical"
            size={25}
            color="#000"
          />
        }>
        <Menu.Item
          onPress={() => {
            navigation.navigate('EditScreen');
            closeMenu();
          }}
          title="Edit store"
        />
        <Menu.Item
          onPress={() => {
            toggleTheme();
          }}
          title={currentTheme.dark ? 'Light theme' : 'Dark theme'}
        />
        <Divider />
        <Menu.Item onPress={signOut} title="Logout" />
      </Menu>
    ),
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        // labelStyle: {fontSize: 12, color: '#eee'},
        style: {
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="PrintScreen" component={PrintScreen} />
    </Tab.Navigator>
  );
};

export default Home;
