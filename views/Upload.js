import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import {Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Keyboard, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useContext, useRef, useState, SafeAreaView, List} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';
import {Video} from 'expo-av';

const Upload = ({navigation}) => {
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

  const [selected, setSelected] = React.useState("");

  const data = [
    {key:'1', value:'League of Legends'},
    {key:'2', value:'Fortnite'},
    {key:'3', value:'Call of Duty: Warzone'},
    {key:'4', value:'Valorant'},
    {key:'5', value:'Apex Legends'},
    {key:'6', value:'Minecraft'},
    {key:'7', value:'Grand Theft Auto V'},
    {key:'8', value:'World of Warcraft'},
    {key:'9', value:'Dota 2'},
    {key:'10', value:'Rust'},
    {key:'11', value:'Overwatch'},
    {key:'12', value:'Escape from Tarkov'},
    {key:'13', value:'Rainbow Six Siege'},
    {key:'14', value:'Counter-Strike: Global Offensive'},
    {key:'15', value:'FIFA 22'},
    {key:'16', value:'Dead by Daylight'},
    {key:'17', value:'NBA 2K22'},
    {key:'18', value:'Genshin Impact'}
    ];

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
    <ScrollView contentContainerStyle={styles.container}>
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
            <Card.Image
              source={{
                uri: mediafile.uri || 'https://placekitten.com/g/200/300',
              }}
              onPress={pickFile}
            />
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
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title && errors.title.message}
                style={styles.input}
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
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                fontFamily="roboto"
                color="white"
                inputStyles={styles.listBox}
                dropdownTextStyles={styles.listBox}
                boxStyles={styles.listField}
            />
              <Button
                mode="contained"
                onPress={pickFile}
              >
                Choose file
              </Button>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    alignItems: "center",
    justifyContent: "center",
  },
  ccontainer:{
    width: "100%",
    flexDirection: "row",
    paddingTop: 32,
    paddingLeft: 110,
    paddingRight: 110,
    backgroundColor: '#00000000',
    borderColor: '#00000000',
  },
  listBox:{
    color: "#ffffff",
  },
  listField:{
    color: "ffffff",
    width: "100%",
    marginBottom: 10,
  },
  input:{
    marginTop: 10,
    color: "white",
  },
  button:{
    width: 200,
  }

});

export default Upload;


Upload.propTypes = {
  navigation: PropTypes.object,
};

