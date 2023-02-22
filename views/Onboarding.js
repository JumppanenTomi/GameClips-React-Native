import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import { HAS_LAUNCHED_KEY } from '../utils/variables';
const introImage = require('assets/imgs/intro-background.jpg');

const Onboarding = ({ navigation, setShowOnboarding }) => {
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage}
      resizeMode='cover'
      source={introImage}>
      <View style={styles.headerContainer}>
        <Text type="heading">
          <Icon label="logo" />
          {' '}
          GameClips
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <Text type="heading" style={styles.text}>
          Discover the best{'\n'}gaming highlights
        </Text>
        <Separator height={16} />
        <Text type="subHeading" style={styles.text}>
          GameClips is a platform for gamers{'\n'}to share their moments.
        </Text>
        <Separator height={16} />
        <Button onPress={handleOnboardingComplete} icon={() => <Icon label="arrow-right" size="16" />}>
          Get Started
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    height: 100,
    backgroundColor: 'rgba(13,13,37,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(13,13,37,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    textAlign: 'center',
  }
});

export default Onboarding;
