import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

const ClipList = () => {
  return (
    <View style={styles.container}>
      <FlatList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ClipList;

