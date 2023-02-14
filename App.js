import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigations/Navigator';

const App = () => {
  return (
    <MainProvider>
      <View style={appStyles.container}>
        <Navigator />
      </View>
      <StatusBar style="auto" />
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
