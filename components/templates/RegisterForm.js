import React, { useState } from 'react';
import { useUser } from 'hooks/ApiHooks';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from '../atoms/Button';
import FormInput from '../atoms/FormInput';
import Icon from '../atoms/Icon';
import Separator from '../atoms/Separator';
import Text from '../atoms/Text';

const RegisterForm = ({ handleToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { postUser, checkUsername } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('register', registerResult);
    } catch (error) {
      console.log('Error register', error);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Text type="heading" style={{ textAlign: 'center' }}>
          Let's create your account!
        </Text>
        <Separator height={24} />
        <FormInput
          control={control}
          name="email"
          label="Email"
          rules={{ required: true, pattern: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i }}
          errorText={errors.email && 'Please enter a valid email'}
        />

        <FormInput
          control={control}
          name="username"
          label="Username"
          rules={{ required: true, minLength: 5 }}
          errorText={
            errors.username &&
            'Please enter a username with at least 3 characters'
          }
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry={!showPassword}
          rules={{ required: true, minLength: 3 }}
          errorText={
            errors.password &&
            'Please enter a password with at least 3 characters, one number and one uppercase letter'
          }
          right={
            <TextInput.Icon
              icon={() => <Icon label={showPassword ? 'eye' : 'eye-slash'} size={16} />}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <FormInput
          control={control}
          name="full_name"
          label="Full name"
          rules={{ minLength: 3 }}
          errorText={
            errors.full_name &&
            'Please enter a full name with at least 3 characters'
          }
        />
        <Separator height={8} />
        <Text type="subHeading">
          By clicking Register, you acknowledge and agree to the{' '}
          <Text type="link">Terms of Service</Text> and{' '}
          <Text type="link">Privacy Policy</Text>.
        </Text>
        <Separator height={16} />
        <Button fullWidth icon={() => <Icon label="arrow-right" size={16} />} onPress={handleSubmit(register)}>
          Register
        </Button>
      </View>
      <View style={styles.footerContainer}>
        <Text type="subHeading">
          Have an account?{' '}
          <Text type="link" onPress={handleToggle}>
            Login
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
  }
});

export default RegisterForm;
