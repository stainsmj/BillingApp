import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, StyleSheet, SectionList} from 'react-native';
import {useTheme} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import {useSelector, useDispatch} from 'react-redux';
import Item from '../components/ListItem';
//database local
import {queryAllCatagory} from '../database/schema';

import {AddItem} from '../actions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  //TO LOAD DATA AFTER THE COMPONENT RENDERED
  useEffect(() => {
    reloadData();
  }, []);

  //TO SEARCH WITH THE GIVER KEY STRING
  const searchForKey = (key) => {
    if (key.length > 0) {
      let temp_section = sections;
      let final_data = temp_section.map((section) => {
        let temp_data = section.data.filter((item) => item.title.includes(key));
        return {title: section.title, id: section.id, data: temp_data};
      });
      setSections(final_data);
    } else {
      reloadData();
    }
  };

  //ADD ITEM TO PRINTSCREEN
  const addPrintItem = (item) => {
    console.log('object', item);
    dispatch(
      AddItem({
        title: item.title,
        amount: 14,
        measurementIn: 'kg',
        price: item.price,
      }),
    );
  };

  //FUNCTION THAT QUERY FOR ALL ITEMS
  const reloadData = () => {
    queryAllCatagory()
      .then((data) => setSections(Array.from(data)))
      .catch((err) => console.log('ERROR RELOADING DATA'));
  };
  const [sections, setSections] = useState();
  const SEARCHBAR_VISIBLE = useSelector((state) => state.searchbar);
  const currentTheme = useTheme();
  const {colors} = currentTheme;
  return (
    <>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={currentTheme.dark ? 'light-content' : 'dark-content'}
      />
      <View>
        <SearchBar visible={SEARCHBAR_VISIBLE} onTextChange={searchForKey} />
        <SectionList
          style={{marginBottom: SEARCHBAR_VISIBLE ? 50 : 0}}
          sections={sections}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <Item item={item} color={colors.text} onPress={addPrintItem} />
          )}
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
