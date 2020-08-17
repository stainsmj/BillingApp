import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

//database local
import {deleteItem} from '../database/schema';

const ListItem = (props) => {
  const {
    item: {title, price, measurementIn, image, id},
    color,
    editable,
    onChange,
  } = props;
  const {colors} = useTheme();
  return (
    <TouchableRipple onPress={() => alert('' + title)}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Avatar.Image
            size={40}
            style={styles.avatar}
            source={{
              uri: image,
            }}
          />
          <View>
            <Title style={[styles.title, {color}]}>{title}</Title>
            <Caption>
              {price} / {measurementIn}
            </Caption>
          </View>
        </View>
        {editable ? (
          <View style={styles.actionContainer}>
            {/* <AntDesign name="edit" size={25} color={colors.primary} /> */}
            <AntDesign
              name="delete"
              size={25}
              color={colors.error}
              onPress={() => {
                deleteItem(id)
                  .then((data) => {
                    console.log(data);
                    onChange();
                  })
                  .catch((err) => console.log(err));
              }}
            />
          </View>
        ) : null}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  title: {
    fontSize: 15,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',
  },
});
export default ListItem;
