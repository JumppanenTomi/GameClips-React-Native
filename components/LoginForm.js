import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {View, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, Button, HelperText} from 'react-native-paper';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

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
      <Text style={styles.bigHeading}>Welcome to GameClips</Text>
      <Text style={styles.smallHeading}>Please login to continue</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Username"
            autoCapitalize="none"
            mode="outlined"
            style={styles.textInput}
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{required: true, minLength: 5}}
      />
      {errors.username && (
        <HelperText type="error" visible={errors.username}>
          Please enter a username with at least 5 characters
        </HelperText>
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            label="Password"
            secureTextEntry={!showPassword}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            right={
              <Button onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            }
          />
        )}
        name="password"
        rules={{required: true, minLength: 5}}
        defaultValue=""
      />
      {errors.password && (
        <HelperText type="error" visible={errors.password}>
          Please enter a password with at least 5 characters
        </HelperText>
      )}
      <Button
        style={styles.loginButton}
        mode="contained"
        onPress={handleSubmit(logIn)}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bigHeading: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  smallHeading: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    borderRadius: 10,
  },
});

export default LoginForm;
