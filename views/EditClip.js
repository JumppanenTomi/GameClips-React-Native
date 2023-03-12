import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {useMedia} from 'hooks/ApiHooks';
import {useForm} from 'react-hook-form';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import Icon from 'components/atoms/Icon';
import Loader from 'components/atoms/Loader';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import Toast from 'react-native-toast-message';
const introImage = require('assets/imgs/intro-background.jpg');

const EditClip = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const {fileId, title, description} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: title, description: description},
    mode: 'onBlur',
  });
  const {updateMedia} = useMedia();

  const updateClip = async (updateData) => {
    setLoader(true);
    try {
      console.log(updateData)
      await updateMedia(fileId, updateData);
      Toast.show({
        type: 'success',
        text1: 'Successfully editted clip',
        visibilityTime: 1500,
      });
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
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
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={introImage}
    >
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
        style={styles.touchable}
      >
        <View style={styles.mainContainer}>
          <Text type="heading">Edit clip</Text>
          <Separator height={16} />
          <FormInput
            control={control}
            name="title"
            label="Title"
            rules={{required: true, minLength: 3}}
            errorText={errors.title && 'Please enter a title'}
            errors={errors}
          />
          <FormInput
            control={control}
            name="description"
            label="Description"
            errors={errors}
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
            onPress={handleSubmit(updateClip)}
          >
            Update
          </Button>
          <Separator height={24} />
          <Text type="subHeading">
            Everything is correct?{' '}
            <Text type="link" onPress={() => navigation.goBack()}>
              Go back
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  touchable: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(13,13,37,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});

export default EditClip;
