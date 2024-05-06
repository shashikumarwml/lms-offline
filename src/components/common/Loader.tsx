import {View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {genericStyles} from '../../styles/generics';

export default function Loader({loading}: any) {
  if (loading) {
    return (
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={genericStyles.centeredView}>
          <View style={genericStyles.loaderContainer}>
            <ActivityIndicator />
          </View>
        </View>
      </Modal>
    );
  }
  return null;
}
