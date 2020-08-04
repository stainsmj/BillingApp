import React from 'react';
import {View, Text, StatusBar, StyleSheet, SectionList} from 'react-native';
import {useTheme} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import {useSelector} from 'react-redux';
import Item from '../components/ListItem';

const HomeScreen = ({navigation}) => {
  const storeItems = useSelector((state) => state.store);
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
          style={{marginBottom: SEARCHBAR_VISIBLE ? 50 : 0}}
          sections={storeItems}
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
    marginLeft: 10,
    marginTop: 20,
  },
});

export default HomeScreen;
