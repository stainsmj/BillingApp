import React from 'react';
import {
  ScrollView,
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ImageBackground,
  Linking,
  Text,
} from 'react-native';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CameraScreen = () => {
  const [image, setImage] = React.useState(
    'file:///storage/emulated/0/Android/data/com.awesomenative/files/Pictures/2d284adf-8bff-44d2-ae9a-f0bb1ba5e184.jpg',
  );

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
  const requestCameraPermission = async () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then((img) => {
      console.log(img);
      setImage(img.path);
    });
    // ImagePicker.openPicker({
    //   width: 200,
    //   height: 200,
    //   cropping: true,
    // }).then((img) => {
    //   console.log(img);
    //   setImage(img.path);
    // });
  };

  const test = () => {
    const phoneNumber = 'tel:${9655158721}';
    Linking.openURL(phoneNumber);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="cover"
          source={{uri: image}}>
          <FontAwesome name="camera" size={50} onPress={getNewImageFromCam} />
        </ImageBackground>
        <Button title="test" onPress={test} />
        <Button title="request permissions" onPress={requestCameraPermission} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CameraScreen;
