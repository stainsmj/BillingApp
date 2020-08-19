import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, SectionList} from 'react-native';
import {Button} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ModelContainer from '../components/ModelContainer';
import NewSection from '../components/AddNewSection';
import NewItem from '../components/AddNewItem';
import Item from '../components/ListItem';
import {useTheme} from 'react-native-paper';
//database local
import {
  insertNewCatagory,
  queryAllCatagory,
  insertNewItem,
} from '../database/schema';

const EditScreen = ({navigation}) => {
  useEffect(() => {
    reloadData();
  }, []);
  const [sections, setSections] = useState();
  const [currentSection, setCurrentSection] = useState(null);
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [visibleItemModel, setVisibleItemModel] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const reloadData = () => {
    queryAllCatagory()
      .then((data) => {
        console.log('RELOAD DATA:: ', Array.from(data));
        setSections(Array.from(data));
      })
      .catch((err) => console.log('ERROR RELOADING DATA'));
  };

  const showModal = () => setVisible(true);
  const showItemModal = () => setVisibleItemModel(true);

  const addNewItem = (item) => {
    const itemDetails = {
      ...item,
      price: +item.price,
      id: Math.floor(Date.now() / 1000),
    };
    insertNewItem(itemDetails, currentSection)
      .then((data) => {
        reloadData();
        console.log(data);
      })
      .catch((err) => console.log('ERR'));
  };

  const hideModal = () => setVisible(false);
  const hideItemModal = () => setVisibleItemModel(false);
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
        }}>
        <Button
          style={styles.mainButton}
          icon={({color, size}) => (
            <AntDesignIcon name="addfolder" color={color} size={size} />
          )}
          mode="contained"
          onPress={showModal}>
          New Section
        </Button>
        <View style={{flex: 1}}>
          <SectionList
            sections={sections} //storeItems}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <Item
                item={item}
                color={colors.text}
                editable
                onChange={reloadData}
              />
            )}
            renderSectionHeader={({section: {title, id}}) => (
              <View>
                <View style={styles.line} />
                <Text style={[styles.header, {color: colors.text}]}>
                  {title}
                </Text>
                <Button
                  style={styles.mainButton}
                  icon={({color, size}) => (
                    <AntDesignIcon name="addfile" color={color} size={size} />
                  )}
                  mode="outlined"
                  onPress={() => {
                    setCurrentSection(id);
                    showItemModal();
                  }}>
                  New Item
                </Button>
              </View>
            )}
          />
        </View>
      </View>

      <ModelContainer visible={visible} onDismiss={hideModal}>
        <NewSection
          onCancel={hideModal}
          onSave={(text) => {
            const sectionDetails = {
              id: Math.floor(Date.now() / 1000),
              title: text,
              items: [],
            };
            setSaving(true);
            insertNewCatagory(sectionDetails)
              .then((data) => {
                setSaving(false);
                hideModal();
                reloadData();
              })
              .catch((err) => console.log('PROMISE REJECTED'));
          }}
          Saving={saving}
        />
      </ModelContainer>
      <ModelContainer visible={visibleItemModel} onDismiss={hideItemModal}>
        <NewItem
          onCancel={hideItemModal}
          onSave={(item) => addNewItem(item)}
          Saving={saving}
        />
      </ModelContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  line: {
    height: 20,
  },
});

export default EditScreen;
