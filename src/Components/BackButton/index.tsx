import {pop} from '@helpers/NavigatorHelper';
import {ArrowLeft} from '@tamagui/lucide-icons';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';

const BackButton = () => {
  const _renderContent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          pop();
        }}>
        <View style={[styles.container]}>
          <ArrowLeft />
        </View>
      </TouchableOpacity>
    );
  };
  return _renderContent();
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff33',
    borderRadius: 40,
    height: 42,
    width: 42,
    paddingTop: Platform.OS === 'android' ? 0 : 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
