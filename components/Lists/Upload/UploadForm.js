import React, {useCallback, useContext, useRef, useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import Button from 'components/atoms/Button';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '/hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '/contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '/utils/variables';
import {Video} from 'expo-av';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Text from 'components/atoms/Text';
import Separator from 'components/atoms/Separator';
import FormInput from 'components/atoms/FormInput';
import Loader from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
const bgImage = require('assets/imgs/upload-background.png');

const UploadForm = () => {
  const [mediafile, setMediafile] = useState({});
  const video = useRef(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    formState: {errors},
    trigger,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  // Data is from the RAWG API: https://rawg.io/apidocs

  const searchGames = async (query) => {
    const url = `https://api.rawg.io/api/games?search=${query}&key=6411c4fb4f4340ad87976cbfecd8158c&fields=name`;
    try {
      const response = await axios.get(url);
      const gameList = response.data.results.map((result) => ({
        id: result.id,
        name: result.name,
      }));
      setGames(gameList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameSelect = (game) => {
    console.log(`Selected game with id ${game.id} and name ${game.name}`);
    setSelectedGame(game);
  };

  const onSubmit = async (data) => {
    uploadFile(data, selectedGame);
  };

  const uploadFile = async (data, selectedGame) => {
    setLoader(true);
    const formData = new FormData();
    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.description) {
      formData.append('description', data.description);
    }

    console.log(data.title);
    console.log(data.description);

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
        tag: appId,
      };

      const appTag2 = {
        file_id: result.file_id,
        tag: `${appId}_${selectedGame.name}`,
      };

      const tagResult = await postTag(appTag, token);
      const tagResult2 = await postTag(appTag2, token);

      console.log('tag result', tagResult);
      console.log('tag result', tagResult2);
      console.log(appTag);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // update 'update' state in context
            setUpdate(!update);
            // reset form
            // reset();
            // TODO: navigate to home
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoader(false);
    }
  };

  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediafile(result.assets[0]);
        // validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setMediafile({});
    reset();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leaving');
        resetForm();
      };
    }, [])
  );

  console.log('tupe', mediafile.type);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
    >
      <Text type="heading" style={{textAlign: 'center'}}>
        Upload your clip!
      </Text>
      <Separator height={32} />
      {mediafile.type === 'video' ? (
        <Video
          ref={video}
          source={{uri: mediafile.uri}}
          style={{width: '100%', height: 200}}
          resizeMode="cover"
          useNativeControls
          onError={(error) => {
            console.log(error);
          }}
        />
      ) : (
        <Button fullWidth onPress={pickFile} style={styles.uploadButton}>
          Choose File
        </Button>
      )}
      <FormInput
        control={control}
        name="title"
        label="Title"
        rules={{required: true, minLength: 3}}
        errorText={
          errors.title && 'Please enter a title with at least 3 characters'
        }
      />
      <FormInput
        control={control}
        name="description"
        label="Description"
        rules={{minLength: 5}}
        errorText={
          errors.username &&
          'Please enter a description with at least 5 characters'
        }
      />
      <SearchableDropdown
        onItemSelect={handleGameSelect}
        containerStyle={styles.dropdownContainer}
        textInputStyle={styles.textInput}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
        placeholderTextColor="#aaa"
        itemsContainerStyle={styles.itemsContainer}
        items={games}
        placeholder={selectedGame ? selectedGame.name : 'Select game'}
        resetValue={false}
        underlineColorAndroid="transparent"
        onTextChange={searchGames}
      />
      <Button
        fullWidth
        icon={() =>
          loader ? <Loader size={16} /> : <Icon label="arrow-right" />
        }
        onPress={handleSubmit(onSubmit)}
      >
        Upload
      </Button>
      <Button fullWidth onPress={resetForm}>
        Reset
      </Button>
      <Separator height={24} />
      <Text type="subHeading">
        Don't want to upload?{' '}
        <Text type="link" onPress={() => navigation.navigate('Profile')}>
          Go back
        </Text>
      </Text>
    </TouchableOpacity>
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
  dropdownContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  textInput: {
    color: '#aaa',
  },
  uploadButton: {
    paddingVertical: 20,
    borderRadius: 15,
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: '#fff',
  },
  itemsContainer: {
    maxHeight: 140,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#aaa',
  },
});

export default UploadForm;
