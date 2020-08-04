import React from 'react';
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

import {Headline} from 'react-native-paper';
import ModelContainer from '../components/ModelContainer';
import NewSection from '../components/AddNewSection';
import {useSelector} from 'react-redux';
import Item from '../components/ListItem';
import {useTheme} from 'react-native-paper';

const EditScreen = ({navigation}) => {
  const {colors} = useTheme();
  const storeItems = useSelector((state) => state.store);

  const [visible, setVisible] = React.useState(false);
  const [visibleItemModel, setVisibleItemModel] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const showModal = () => setVisible(true);
  const showItemModal = () => setVisibleItemModel(true);

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
            sections={storeItems}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <Item item={item} color={colors.text} editable />
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
            console.log(text);
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
              hideModal();
            }, 1500);
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
