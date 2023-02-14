import React, { useContext, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import FormInput from './FormInput';
import Text from './Text';
import Separator from './Separator';
import Button from './Button';

const RegisterForm = ({ handleToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { postUser, checkUsername } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const register = async (registerData) => {
    delete registerData.confirmPassword;
    console.log('Registering: ', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('register', registerResult);
    } catch (error) {
      console.log('Error register', error);
    }
  };

  return (
    <View style={styles.container}>
      <Separator height={24} />
      <Text type="heading" style={{textAlign: 'center'}}>Let's create your account!</Text>
      <Separator height={24} />
      <FormInput
        control={control}
        name="email"
        label="Email"
        rules={{ required: true, pattern: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i }}
        errorText={errors.email && "Please enter a valid email"}
      />

      <FormInput
        control={control}
        name="username"
        label="Username"
        rules={{ required: true, minLength: 5 }}
        errorText={errors.username && "Please enter a username with at least 3 characters"}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry={!showPassword}
        rules={{ required: true, minLength: 5 }}
        errorText={errors.password && "Please enter a password with at least 5 characters, one number and one uppercase letter"}
        right={<TextInput.Icon icon={showPassword ? "eye-outline" : "eye-off-outline"} onPress={() => setShowPassword(!showPassword)} />}
      />

      <FormInput
        control={control}
        name="full_name"
        label="Full name"
        rules={{ minLength: 3 }}
        errorText={errors.full_name && "Please enter a full name  with at least 3 characters"}
      />

      <Text type="subHeading">By clicking Register, you are indicating that you have read and acknowledge the
        <Text type="link">Terms of Service</Text> and <Text type="link">Privacy Policy</Text>.
      </Text>
      <Button
        fullWidth
        icon="arrow-right"
        onPress={handleSubmit(register)}
      >
        Register
      </Button>
      <Separator height={100} />
      <Text type="subHeading">
        Have an account?{" "}
        <Text type="link" onPress={handleToggle}>Login</Text>
      </Text>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0D0D25',
  },
  bigHeading: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  smallHeading: {
    fontSize: 14,
    color: '#939393',
    marginBottom: 20,
  },
});

export default RegisterForm;