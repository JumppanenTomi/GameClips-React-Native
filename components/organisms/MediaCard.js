import { useNavigation } from '@react-navigation/native';
import { useUser } from 'hooks/ApiHooks';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { uploadsUrl } from 'utils/variables';
import Separator from '../atoms/Separator';
import MediaMeta from '../molecules/MediaMeta';
import MediaTags from '../molecules/MediaTags';

const MediaCard = ({ singleMedia, onPress, style }) => {
  const item = singleMedia;
  const cardStyle = [styles.container, style];
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.item} onPress={() =>
      navigation.navigate('Single', item)
    }>
      <Card style={cardStyle} onPress={onPress}>
        <Image
          style={styles.cardCover}
          source={{ uri: uploadsUrl + item.thumbnails?.w320 }}
        />
        <Separator height={16} />
        <Card.Content>
          <MediaMeta singleMedia={item} />
          <MediaTags singleMedia={item} />
        </Card.Content>
        <Separator height={16} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25253B',
    borderRadius: 20,
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
