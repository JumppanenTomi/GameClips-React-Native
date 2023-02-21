import React, { useContext } from 'react';
import { MainContext } from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from 'hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import { StyleSheet, View, ImageBackground } from 'react-native';

const Update = ({ navigation }) => {
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
      navigation.navigate('Profile')
    } catch (error) {
      console.log('Error updating user', error);
    }
  };

  return (
    <ImageBackground style={styles.imgBackground}
      resizeMode='cover'
      source={require('assets/imgs/1.jpg')}>
      <View style={styles.container}>
        <Text type="heading" style={{ textAlign: 'center' }}>
          Update your account!
        </Text>
        <Separator height={100} />
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
          rules={{ required: true, pattern: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i }}
          errorText={errors.email && 'Please enter a valid email'}
        />

        <Button fullWidth icon="arrow-right" onPress={handleSubmit(updateUser)}>
          Update
        </Button>
        <Separator height={24} />
        <Text type="subHeading">
          Everything is correct?{' '}
          <Text type="link" onPress={() => navigation.navigate('Profile')}>
            Go back
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(13,13,37,0.9)',
    justifyContent: 'flex-end',
    paddingBottom: 90,
  },
  imgBackground: {
    flex: 1,
    width: '100%'
  }
})

export default Update;