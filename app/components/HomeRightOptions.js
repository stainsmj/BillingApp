import React, {useState} from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import {useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {Menu, Divider} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {SIGNOUT, TOGGLE_THEME, TOGGLE_SEARCH_BAR} from '../actions';

const HomeRightOptions = ({navigation}) => {
  const {colors, dark} = useTheme();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const closeMenu = () => setVisible((preState) => !preState);
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (err) {
      console.log(err);
    }
    dispatch(SIGNOUT());
  };
  const toggleTheme = () => {
    dispatch(TOGGLE_THEME());
  };
  const toggleSearchBar = () => {
    dispatch(TOGGLE_SEARCH_BAR());
  };
  return (
    <View style={styles.container}>
      <Feather
        style={styles.search}
        name="search"
        size={25}
        onPress={toggleSearchBar}
        color={colors.text}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Feather
            onPress={closeMenu}
            name="more-vertical"
            size={25}
            color={colors.text}
          />
        }>
        <Menu.Item
          onPress={() => {
            navigation.navigate('EditScreen');
            console.log(navigation);
            closeMenu();
          }}
          title="Edit store"
        />
        <Menu.Item
          onPress={() => {
            toggleTheme();
          }}
          title={dark ? 'Light theme' : 'Dark theme'}
        />
        <Divider />
        <Menu.Item onPress={signOut} title="Logout" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  search: {
    marginRight: 10,
  },
});
export default HomeRightOptions;
