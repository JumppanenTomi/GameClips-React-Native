import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ProfileInfo from '../components/templates/ProfileInfo';
import MediaCard from 'components/organisms/MediaCard';
import { useMedia } from 'hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from 'components/molecules/EmptyList';

const Profile = ({ navigation }) => {
  const [mediaArray, setMediaArray] = useState([]);
  const { loadUserMedia } = useMedia();

  const getMedia = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const json = await loadUserMedia(token);
    const media = json.filter((item) => item.media_type === 'video');
    setMediaArray(media);
  };

  useEffect(() => {
    getMedia();
  }, []);


  console.log(mediaArray);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mediaArray}
        ListHeaderComponent={<ProfileInfo navigation={navigation} mediaCount={mediaArray.length} />}
        ListEmptyComponent={<EmptyList />}
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
    paddingTop: 50,
    paddingBottom: 90,
  },
  card: {
    marginHorizontal: 24,
    marginVertical: 8
  }
})

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
