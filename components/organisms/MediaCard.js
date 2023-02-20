import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {uploadsUrl} from 'utils/variables';
import Separator from '../atoms/Separator';
import MediaMeta from '../molecules/MediaMeta';
import MediaTags from '../molecules/MediaTags';

const MediaCard = ({singleMedia, navigation}) => {
  const item = singleMedia;

  return (
    <Card style={styles.container} onPress={() => console.log('Pressed')}>
      <Image
        style={styles.cardCover}
        source={{uri: uploadsUrl + item.filename}}
      />
      <Separator height={16} />
      <Card.Content>
        <MediaMeta singleMedia={item} />
        <MediaTags singleMedia={item} />
      </Card.Content>
      <Separator height={16} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25253B',
    borderRadius: 20,
    marginBottom: 16,
    minWidth: 302,
  },
  cardCover: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 180,
  },
});

export default MediaCard;
