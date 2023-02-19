import React from 'react';
import {StyleSheet, View} from 'react-native';
import Avatar from '../atoms/Avatar';
import Separator from '../atoms/Separator';
import Text from '../atoms/Text';

const MediaMeta = ({singleMedia}) => {
  const item = singleMedia;

  return (
    <>
      <Text type="meta">{item.description}</Text>
      <Separator height={8} />
      <View style={styles.container}>
        <Avatar size={24} userID={item.user_id} />
        <Text type="meta" style={styles.text}>
          {item.user_id}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
  },
});

export default MediaMeta;
