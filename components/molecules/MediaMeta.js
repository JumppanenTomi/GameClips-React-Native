import React, {useEffect, useState} from 'react';
import {useUser} from 'hooks/ApiHooks';
import {StyleSheet, View} from 'react-native';
import Avatar from '../atoms/Avatar';
import Separator from '../atoms/Separator';
import Text from '../atoms/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MediaMeta = ({singleMedia}) => {
  const item = singleMedia;
  const [owner, setOwner] = useState('');
  const {getUserById} = useUser();

  useEffect(() => {
    const getOwner = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const result = await getUserById(token, item.user_id);
        setOwner(result.username);
      } catch (error) {
        console.log(error);
      }
    };
    getOwner();
  }, [item]);

  return (
    <>
      <Text style={{color: '#FFF', fontSize: 14}}>{item.title}</Text>
      <Separator height={8} />
      <View style={styles.container}>
        <Avatar size={24} userId={item.user_id} username={owner} />
        <Text type="meta" style={styles.text}>
          @{owner}
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
