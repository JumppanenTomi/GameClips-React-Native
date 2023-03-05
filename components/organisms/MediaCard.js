import {useUser} from 'hooks/ApiHooks';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {uploadsUrl} from 'utils/variables';
import Separator from '../atoms/Separator';
import MediaMeta from '../molecules/MediaMeta';
import MediaTags from '../molecules/MediaTags';

const MediaCard = ({singleMedia, onPress, style}) => {
  const item = singleMedia;
  const cardStyle = [styles.container, style];

  return (
    <Card style={cardStyle} onPress={onPress}>
      <Image
        style={styles.cardCover}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
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
    minWidth: 302,
    marginRight: 8,
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
