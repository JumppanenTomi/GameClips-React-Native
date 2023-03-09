import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import UploadForm from '../components/Lists/Upload/UploadForm';

const Upload = () => {
  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={require('assets/imgs/profile-background.jpg')}
    >
      <UploadForm />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
  },
});

export default Upload;
