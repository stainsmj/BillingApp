import React from 'react';
import {View, Text, StatusBar, StyleSheet, SectionList} from 'react-native';
import {useTheme} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import {useSelector} from 'react-redux';
import Item from '../components/ListItem';

const DATA = [
  {
    title: 'Main dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    title: 'Main dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    title: 'Main dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    title: 'Main dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
];

const HomeScreen = ({navigation}) => {
  const SEARCHBAR_VISIBLE = useSelector((state) => state.searchbar);
  console.log(SEARCHBAR_VISIBLE);
  const currentTheme = useTheme();
  const {colors} = currentTheme;
  return (
    <>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={currentTheme.dark ? 'light-content' : 'dark-content'}
      />
      <View>
        <SearchBar visible={SEARCHBAR_VISIBLE} />
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Item item={item} color={colors.text} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={[styles.header, {color: colors.text}]}>{title}</Text>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
