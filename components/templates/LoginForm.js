import React, {useContext, useState} from 'react';
import {MainContext} from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from 'hooks/ApiHooks';
import {useForm} from 'react-hook-form';
import {StyleSheet, View, Keyboard} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import Icon from 'components/atoms/Icon';
import Loader from 'components/atoms/Loader';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import Toast from 'react-native-toast-message';

const LoginForm = ({handleToggle}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const logIn = async (loginData) => {
    console.log('Attempting login with credentials:', loginData);
    setLoader(true);
    Keyboard.dismiss();
    try {
      const loginResult = await postLogin(loginData);
      console.log('Login successful. Received data:', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Login failed. Received error:', error.message);
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Icon label="logo" size={50} />
        <Separator height={32} />
        <Text type="heading">Welcome to GameClips</Text>
        <Separator height={16} />
        <Text type="subHeading">Please login to continue.</Text>
        <FormInput
          control={control}
          name="username"
          label="Username"
          rules={{required: true, minLength: 3}}
          errorText={
            errors.username &&
            'Please enter a username with at least 3 characters'
          }
          errors={errors}
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry={!showPassword}
          rules={{required: true, minLength: 3}}
          errorText={
            errors.password &&
            'Please enter a password with at least 3 characters'
          }
          right={
            <TextInput.Icon
              icon={() => (
                <Icon label={showPassword ? 'eye' : 'eye-slash'} size={16} />
              )}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Separator height={8} />
        <Button
          fullWidth
          icon={() =>
            loader ? (
              <Loader size={16} />
            ) : (
              <Icon label="arrow-right" size={16} />
            )
          }
          onPress={handleSubmit(logIn)}
        >
          Login
        </Button>
      </View>

      <View style={styles.footerContainer}>
        <Text type="subHeading">
          Don't have an account?{' '}
          <Text type="link" onPress={handleToggle}>
            Register
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(13,13,37,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  footerContainer: {
    height: 100,
    backgroundColor: 'rgba(13,13,37,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
});

export default LoginForm;
