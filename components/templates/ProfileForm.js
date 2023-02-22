import React, { useContext } from 'react';
import { MainContext } from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from 'hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import { StyleSheet, View } from 'react-native';

const ProfileForm = ({ handleToggle }) => {
  const { putUser, getUserByToken } = useUser();
  const { user, setUser } = useContext(MainContext);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
    },
    mode: 'onBlur',
  });

  const updateUser = async (updateData) => {
    delete updateData.confirmPassword;
    if (!updateData.password) {
      delete updateData.password;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const updateResult = await putUser(updateData, token);
      console.log('updateUser', updateResult);
      const updatedData = await getUserByToken(token);
      setUser(updatedData);
      handleToggleForm();
    } catch (error) {
      console.log('Error updating user', error);
    }
  };

  return (
    <View style={styles.container}>
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
        secureTextEntry
        rules={{ required: true, minLength: 5 }}
        errorText={
          errors.password &&
          'Please enter a password with at least 5 characters, one number and one uppercase letter'
        }
      />
      <FormInput
        control={control}
        name="email"
        label="Email"
        rules={{required: true, pattern: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i}}
        errorText={errors.email && 'Please enter a valid email'}
      />

      <Button fullWidth icon="arrow-right" onPress={handleSubmit(updateUser)}>
        Update
      </Button>
      <Separator height={24} />
      <Text type="subHeading">
        Everything is correct?{' '}
        <Text type="link" onPress={handleToggle}>
          Go back
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0D0D25',
    justifyContent: 'flex-end',
    paddingBottom: 90
  },
})

export default ProfileForm;