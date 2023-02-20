import React, {useState, useEffect} from 'react';
import {Avatar as RNPAvatar} from 'react-native-paper';
import {uploadsUrl} from '../../utils/variables';
import {useTag} from '../../hooks/ApiHooks';

const Avatar = ({userID, ...rest}) => {
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + userID);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.log('user avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return <RNPAvatar.Image source={{uri: uploadsUrl + avatar}} {...rest} />;
};

export default Avatar;
