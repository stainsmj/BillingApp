import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

const App = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
