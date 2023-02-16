import React from 'react';
import {View, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigations/Navigator';

const App = () => {
  return (
    <MainProvider>
      <View style={appStyles.container}>
        <Navigator />
      </View>
      <StatusBar style={"light"} />
    </MainProvider>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
  },
});

export default App;
