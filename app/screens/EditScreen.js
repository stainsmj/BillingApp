import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  SectionList,
} from 'react-native';
import {Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-crop-picker';

import {Headline} from 'react-native-paper';
import ModelContainer from '../components/ModelContainer';
import NewSection from '../components/AddNewSection';
import {useSelector} from 'react-redux';
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
  const {colors} = useTheme();
  const storeItems = useSelector((state) => state.store);

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
  const showItemModal = () => {
    const sectionId = 1597655126;
    const itemDetails = {
      id: Math.floor(Date.now() / 1000),
      title: 'text',
      price: 23,
      image: 'dasdasd',
      measurementIn: 'kg',
    };
    insertNewItem(itemDetails, sectionId)
      .then((data) => {
        reloadData();
        console.log(data);
      })
      .catch((err) => console.log('ERR'));

    // setVisibleItemModel(true);
    // ImagePicker.openCamera({
    //   width: 200,
    //   height: 200,
    //   cropping: true,
    // }).then((img) => {
    //   console.log(img);
    //   setImage(img.path);
    // });
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
            renderSectionHeader={({section: {title}}) => (
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
                  onPress={showItemModal}>
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
                console.log(data);
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
        <Text>Item model</Text>
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
