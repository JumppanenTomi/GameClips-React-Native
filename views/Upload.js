import React from 'react';
import { StyleSheet, View } from 'react-native';
import UploadForm from '../components/Lists/Upload/UploadForm';

const Upload = () => {
  return (
    <View style={styles.container}>
      <UploadForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
});

export default Upload;

