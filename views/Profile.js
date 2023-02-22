import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ProfileInfo from '../components/templates/ProfileInfo';
import MediaCard from 'components/organisms/MediaCard';
import { useMedia } from 'hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Separator from 'components/atoms/Separator';

const Profile = ({ navigation }) => {
  const [mediaArray, setMediaArray] = useState([]);
  const { loadUserMedia } = useMedia();

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
    <SafeAreaView style={styles.container}>
      <Separator height={50} />
      <FlatList
        data={mediaArray}
        ListHeaderComponent={<ProfileInfo navigation={navigation} />}
        renderItem={({ item }) => <MediaCard singleMedia={item} style={styles.card} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#0D0D25',
    paddingBottom: 90
  },
  card: {
    marginHorizontal: 24,
    marginBottom: 16
  }
})

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
