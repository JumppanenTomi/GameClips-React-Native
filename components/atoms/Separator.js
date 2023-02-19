import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

const Separator = ({ height }) => {
  return (
    <View style={[styles.separator, { height: height }]}>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Separator;
