import React, {useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {TextInput, Button, Headline} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

const AddNewItem = ({onCancel, onSave, Saving}) => {
  const [image, setImage] = useState('noimg');
  const [measurementIn, setMeasurementIn] = useState('kg');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const getNewImageFromCam = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then((img) => {
        console.log(img);
        setImage(img.path);
      })
      .catch((err) => {
        console.log('####ERROR, CANCELLED!', err.message);
      });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Headline>Create New Item</Headline>
      <TextInput
        value={name}
        onChangeText={(name) => setName(name)}
        style={{
          marginVertical: 20,
        }}
        mode="outlined"
        label="Name"
      />
      <TextInput
        value={price}
        keyboardType="numeric"
        onChangeText={(price) => setPrice(price)}
        style={{
          marginVertical: 20,
        }}
        mode="outlined"
        label="Price"
      />

      <Picker
        selectedValue={measurementIn}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) => setMeasurementIn(itemValue)}>
        <Picker.Item label="Kilogram" value="kg" />
        <Picker.Item label="Gram" value="g" />
        <Picker.Item label="Litter" value="l" />
      </Picker>
      <ImageBackground
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="cover"
        source={{uri: image}}>
        <FontAwesome name="camera" size={50} onPress={getNewImageFromCam} />
      </ImageBackground>
      <Button
        loading={Saving}
        onPress={() =>
          onSave({
            title: name,
            image,
            price,
            measurementIn,
          })
        }
        style={{
          marginVertical: 5,
        }}
        mode="contained">
        Save
      </Button>
      <Button
        onPress={onCancel}
        style={{
          marginVertical: 5,
        }}
        mode="outlined">
        Cancel
      </Button>
    </View>
  );
};

export default AddNewItem;
