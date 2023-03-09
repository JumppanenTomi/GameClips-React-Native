import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTag} from 'hooks/useTag';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'components/atoms/Icon';
import MediaCard from 'components/organisms/MediaCard';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import TagList from 'components/organisms/TagList';
import {appId, baseUrl} from 'utils/variables';

const BrowseList = () => {
  const navigation = useNavigation();
  const {getFilesByTag} = useTag();
  const [mediaArray, setMediaArray] = useState([]);
  const [curTag, setCurTag] = useState('');

  useEffect(() => {
    const fetchClips = async () => {
      const json = await getFilesByTag(appId + '_' + curTag);
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);
    };

    fetchClips();
  }, [curTag]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('ClipList', {mediaArray: mediaArray})
        }
      >
        <Text type="title">Browse Clips </Text>
        <Icon label="arrow-next" size={20} />
      </TouchableOpacity>
      <Separator height={16} />
      <TagList curTag={curTag} setCurTag={setCurTag} />
      <Separator height={16} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <MediaCard singleMedia={item} style={styles.card} />
          )}
        />
      </View>
      <Separator height={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  card: {
    marginRight: 8,
  },
});

export default BrowseList;
