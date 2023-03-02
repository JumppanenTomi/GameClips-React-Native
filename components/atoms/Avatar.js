import React, { useState, useEffect } from 'react';
import { Avatar as RNPAvatar } from 'react-native-paper';
import { uploadsUrl } from '../../utils/variables';
import { useTag } from '../../hooks/ApiHooks';
import { TouchableOpacity } from 'react-native';

const Avatar = ({ source, userID, onPress, ...rest }) => {
  const { getFilesByTag } = useTag();
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

  return (
    <TouchableOpacity onPress={onPress}>
      <RNPAvatar.Image source={{ uri: source || (uploadsUrl + avatar) }}  {...rest} />
    </TouchableOpacity>
  )
};

export default Avatar;
