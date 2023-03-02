import React, {
  useEffect,
  useCallback,
  useContext,
  useRef,
  useState,
  SafeAreaView,
  List,
} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
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
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const items = [
    {
      id: 1,
      name: 'League of Legends',
    },
    {
      id: 2,
      name: 'Dota 2',
    },
    {
      id: 3,
      name: 'Counter-Strike: Global Offensive',
    },
    {
      id: 4,
      name: 'Fortnite',
    },
    {
      id: 5,
      name: 'Apex Legends',
    },
    {
      id: 6,
      name: 'Rainbow Six Siege',
    },
    {
      id: 7,
      name: 'Overwatch',
    },
    {
      id: 8,
      name: 'Call of Duty: Modern Warfare',
    },
    {
      id: 9,
      name: 'Rocket League',
    },
    {
      id: 10,
      name: 'Valorant',
    },
  ]

  const [gameItems, setItems] = useState([items]);

  const handleGameSelect = (items) => {
    console.log(`Selected game with id ${items.id} and name ${items.name}`);
    setSelectedGame(items);
  };

  const handleSubmit = async (data) => {
    uploadFile(data, selectedGame);
  }

  const uploadFile = async (data, selectedGame) => {
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
        tag: `${appId}_${selectedGame.name}`,
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);
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
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={bgImage}
      >
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
              <Button onPress={pickFile} style={styles.uploadButton}>
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
                  errorMessage={
                    errors.description && errors.description.message
                  }
                />
              )}
              name="description"
            />
            <SearchableDropdown
              onItemSelect={handleGameSelect}
              containerStyle={styles.dropdownContainer}
              textInputStyle={styles.textInput}
              itemStyle={styles.item}
              itemTextStyle={styles.itemText}
              placeholderTextColor="#aaa"
              itemsContainerStyle={styles.itemsContainer}
              items={items}
              placeholder={selectedGame ? selectedGame.name : 'Select game'}
              resetValue={false}
              underlineColorAndroid="transparent"
              onTextChange={(text) => {
                const filteredItems = items.filter((item) =>
                  item.name.toLowerCase().includes(text.toLowerCase())
                );
                setItems(filteredItems);
              }}
            />
            <Button
              loading={loading}
              style={styles.button}
              disabled={!mediafile.uri || errors.title || errors.description}
              mode="contained"
              onPress={handleSubmit}
            >
              Upload
            </Button>
            <Button onPress={resetForm} style={styles.button}>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#00000000',
    height: '100%',
  },
  ccontainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
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
  button: {
    width: 200,
    marginTop: 10,
  },
  uploadButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
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
