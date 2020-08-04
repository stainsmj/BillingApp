import React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Headline} from 'react-native-paper';

const AddNewSection = ({onCancel, onSave, Saving}) => {
  const [name, setName] = React.useState('');
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Headline>Create New Section</Headline>
      <TextInput
        onSubmitEditing={() => onSave(name)}
        value={name}
        onChangeText={(name) => setName(name)}
        style={{
          marginVertical: 20,
        }}
        mode="outlined"
        label="Enter Section Name"
      />
      <Button
        loading={Saving}
        onPress={() => onSave(name)}
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

export default AddNewSection;
