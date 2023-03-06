import React, { useEffect, useState } from 'react';
import { useTag } from 'hooks/useTag';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'components/atoms/Icon';
import MediaCard from 'components/organisms/MediaCard';
import Separator from 'components/atoms/Separator';
import { TagButton } from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import { appId, baseUrl } from 'utils/variables';
import { tags } from 'utils/tags';

const BrowseList = () => {
  const { getFilesByTag } = useTag();
  const [mediaArray, setMediaArray] = useState([]);
  const [tag, setTag] = useState(tags[0]);

  useEffect(() => {
    const fetchClips = async () => {
      const json = await getFilesByTag(appId + '_' + tag.name);
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);
    }

    fetchClips();
  }, [tag]);

  const handleTag = (currTag) => {
    setTag(currTag);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text type="title">Browse Clips </Text>
        <Icon label="arrow-next" size={20} />
      </TouchableOpacity>
      <Separator height={16} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tags}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TagButton style={styles.tag} selected={item === tag} onPress={() => handleTag(item)}>{item.label}</TagButton>
          )}
        />
      </View>
      <Separator height={16} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <MediaCard singleMedia={item} style={styles.card} />}
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
  tag: {
    marginRight: 8
  },
  card: {
    marginRight: 8
  }
});

export default BrowseList;
