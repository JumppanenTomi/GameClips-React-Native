import React from 'react';
import { StyleSheet, View } from 'react-native';
import GamesList from '../components/Lists/Browse/GamesList';

const Browse = () => {
  return (
    <View style={styles.container}>
      <GamesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Browse;
