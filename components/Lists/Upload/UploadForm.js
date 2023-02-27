import React, {useEffect, useCallback, useContext, useRef, useState, SafeAreaView, List} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Keyboard, ScrollView, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList, ImageBackground} from 'react-native';
import Button from "components/atoms/Button";
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '/hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '/contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '/utils/variables';
import {Video} from 'expo-av';
import axios from 'axios';
const bgImage = require('assets/imgs/upload-background.png');

const UploadForm = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});
  const video = useRef(null);
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

// Data is from the RAWG API: https://rawg.io/apidocs

  const searchGames = async (query) => {
    const url = `https://api.rawg.io/api/games?search=${query}&key=6411c4fb4f4340ad87976cbfecd8158c&fields=name`;
    try {
      const response = await axios.get(url);
      const gameList = response.data.results.map((result) => ({ id: result.id, name: result.name }));
      setGames(gameList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameSelect = (game) => {
    console.log(`Selected game with id ${game.id} and name ${game.name}`);
    setSelectedGame(game);
  };

  const uploadFile = async (data) => {
    // create form data and post it
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
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
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

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
      setLoading(false);
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
    <View style={styles.container}>
     <ImageBackground style={styles.backgroundImage}
      resizeMode='cover'
      source={bgImage}>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card containerStyle={styles.ccontainer}>
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
            <Button
              onPress={pickFile}
              style={styles.uploadButton}
            >
              Choose File
            </Button>

          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'A title is required!',
              },
              minLength: {
                value: 3,
                message: 'Title min length is 3 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title && errors.title.message}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Minimum 5 characters!',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Description"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#aaa"
                multiline={true}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
              <SearchableDropdown
                onTextChange={searchGames}
                onItemSelect={handleGameSelect}
                containerStyle={styles.dropdownContainer}
                textInputStyle={styles.textInput}
                itemStyle={styles.item}
                itemTextStyle={styles.itemText}
                placeholderTextColor="#aaa"
                itemsContainerStyle={styles.itemsContainer}
                items={games}
                placeholder={selectedGame ? selectedGame.name : "Select game"}
                resetValue={false}
                underlineColorAndroid="transparent"
              />
          <Button
              loading={loading}
              style={styles.button}
              disabled={!mediafile.uri || errors.title || errors.description}
              mode="contained"
              onPress={handleSubmit(uploadFile)}
            >
              Upload
            </Button>
          <Button onPress={resetForm}
                        style={styles.button}>
            Reset
            </Button>
        </Card>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#00000000',
    height: "100%",
  },
  ccontainer:{
    width: "100%",
    height: "100%",
    flexDirection: "row",
    paddingTop: 100,
    paddingLeft: 110,
    paddingRight: 110,
    backgroundColor: '#00000000',
    borderColor: '#00000000',
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
  item: {
    padding: 10,
  },
  itemText: {
    color: '#fff',
  },
  itemsContainer: {
    maxHeight: 140,
  },
  button:{
    width: 200,
    marginTop: 10,
  },
  uploadButton:{
    width: 200,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  input:{
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#aaa',
  }

});

export default UploadForm;

