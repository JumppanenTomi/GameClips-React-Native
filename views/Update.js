import React, {useContext, useState} from 'react';
import {MainContext} from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag, useUser} from 'hooks/ApiHooks';
import {useForm} from 'react-hook-form';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import {
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'components/atoms/Icon';
import Avatar from 'components/atoms/Avatar';
import * as ImagePicker from 'expo-image-picker';
import Loader from 'components/atoms/Loader';
import Toast from 'react-native-toast-message';

const Update = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});
  const [loader, setLoader] = useState(false);
  const {putUser, getUserByToken} = useUser();
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      email: user.email,
    },
    mode: 'onBlur',
  });

  const updateUser = async (updateData) => {
    setLoader(true);
    if (!updateData.password) {
      delete updateData.password;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const updateResult = await putUser(updateData, token);
      console.log('updateUser', updateResult);
      const updatedData = await getUserByToken(token);
      setUser(updatedData);
      if (mediafile.uri) {
        uploadAvatar();
      }
      console.log('Logging out!');
      setUser({});
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('userToken');
      Toast.show({
        type: 'success',
        text1: 'Successfully updated profile. Please login again.',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log('Error updating user', error);
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append('title', 'avatar_' + user.user_id);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);

      const appTag = {
        file_id: result.file_id,
        tag: 'avatar_' + user.user_id,
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);
    } catch (error) {
      console.error('file upload failed', error);
    }
  };

  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      console.log(result);
      if (!result.canceled) {
        setMediafile(result.assets[0]);
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={require('assets/imgs/profile-background.jpg')}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <Text type="heading" style={{textAlign: 'center'}}>
          Update your account!
        </Text>
        <Separator height={48} />
        <Avatar
          tempSource={mediafile?.uri}
          userId={user.user_id}
          size={160}
          onPress={pickFile}
        />
        <Separator height={24} />
        <FormInput
          control={control}
          name="username"
          label="Username"
          rules={{required: true, minLength: 3}}
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
          rules={{minLength: 3}}
          errorText={
            errors.password &&
            'Please enter a password with at least 3 characters, one number and one uppercase letter'
          }
        />
        <FormInput
          control={control}
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i,
          }}
          errorText={errors.email && 'Please enter a valid email'}
        />

        <Button
          fullWidth
          icon={() =>
            loader ? <Loader size={16} /> : <Icon label="arrow-right" />
          }
          onPress={handleSubmit(updateUser)}
        >
          Update
        </Button>
        <Separator height={24} />
        <Text type="subHeading">
          Everything is correct?{' '}
          <Text type="link" onPress={() => navigation.navigate('Profile')}>
            Go back
          </Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(13,13,37,0.8)',
    justifyContent: 'center',
  },
  imgBackground: {
    flex: 1,
    width: '100%',
  },
});

export default Update;
