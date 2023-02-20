import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../../hooks/ApiHooks';
import Text from '../atoms/Text';
import {StyleSheet, View} from 'react-native';
import Separator from '../atoms/Separator';
import Avatar from '../atoms/Avatar';
import FlatList from '../organisms/FlatList';

const ProfileInfo = () => {
  const {user} = useContext(MainContext);
  const {loadUserMedia} = useMedia();
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const res = await loadUserMedia(token);
    setMediaArray(res);
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <View style={styles.container}>
      <Avatar size={100} userID={user.user_id} />
      <Separator height={10} />
      <Text type="body" style={styles.textName}>
        {user.full_name}
      </Text>
      <Text type="subHeading">@{user.username}</Text>
      <Text type="subHeading">I just no one that love to do livestream.</Text>
      <FlatList mediaArray={mediaArray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  textName: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
