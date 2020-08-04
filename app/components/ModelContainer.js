import React from 'react';
import {ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Modal, Portal, Text, useTheme} from 'react-native-paper';

const ModelContainer = ({visible, onDismiss, children}) => {
  const {colors} = useTheme();
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Animatable.View
          animation="bounceIn"
          style={{
            backgroundColor: colors.surface,
            width: '90%',

            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <ScrollView>{children}</ScrollView>
        </Animatable.View>
      </Modal>
    </Portal>
  );
};

export default ModelContainer;
