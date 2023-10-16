import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

const HomeScreen: FC = () => {
  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {/*
         */}
      </View>
    );
  };
  return _renderContent();
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
