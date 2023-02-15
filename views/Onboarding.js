import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Text from '../components/Text';
import {HAS_LAUNCHED_KEY} from '../utils/variables';

const Onboarding = ({navigation}) => {
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  
  const checkOnboardingStatus = async () => {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
    if (hasLaunched === 'true') {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text type="heading" style={styles.text}>
        Discover the best{'\n'}gaming highlights
      </Text>
      <Text type="subHeading" style={styles.text}>
        GameClips is a platform for gamers{'\n'}to share their moments.
      </Text>
      <Button icon="arrow-right" onPress={handleOnboardingComplete}>
        Discover
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D25',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});

export default Onboarding;
