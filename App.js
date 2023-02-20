import React from 'react';
import {View, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigations/Navigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'fontFamily "Roboto" is not a system font and has not been loaded through Font.loadAsync.',
  'fontFamily "roboto" is not a system font and has not been loaded through Font.loadAsync.',
]);

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
