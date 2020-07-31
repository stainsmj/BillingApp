import React from 'react';
import {View, Text, Button} from 'react-native';

const EditScreen = ({navigation}) => {
  return (
    <View>
      <Text>EditScreeen</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('HomeNavigator')}
      />
    </View>
  );
};

export default EditScreen;
