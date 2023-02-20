import React, {useContext, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../../hooks/ApiHooks';
import {View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import FormInput from '../atoms/FormInput';
import Text from '../atoms/Text';
import Separator from '../atoms/Separator';
import Button from '../atoms/Button';

const LoginForm = ({handleToggle}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error login', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text type="heading">Welcome to GameClips</Text>
      <Text type="subHeading">Please login to continue.</Text>
      <FormInput
        control={control}
        name="username"
        label="Username"
        rules={{required: true, minLength: 5}}
        errorText={
          errors.username &&
          'Please enter a username with at least 5 characters'
        }
      />
      <FormInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry={!showPassword}
        rules={{required: true, minLength: 5}}
        errorText={
          errors.password &&
          'Please enter a password with at least 5 characters'
        }
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button fullWidth icon="arrow-right" onPress={handleSubmit(logIn)}>
        Login
      </Button>
      <Separator height={100} />
      <Text type="subHeading">
        Don't have an account?{' '}
        <Text type="link" onPress={handleToggle}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0D0D25',
  },
});

export default LoginForm;