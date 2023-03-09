import React, {useState, useEffect} from 'react';
import {useTag} from '../../hooks/ApiHooks';
import {TouchableOpacity} from 'react-native';
import {Avatar as RNPAvatar} from 'react-native-paper';
import {uploadsUrl} from '../../utils/variables';

const Avatar = ({userId, onPress, tempSource, ...rest}) => {
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const avatarArray = await getFilesByTag('avatar_' + userId);
        setAvatar(avatarArray.pop().filename);
      } catch (error) {
        setAvatar('4254c98a7ccd66d74ff4179b3d9df713.png');
        console.log('user avatar fetch failed', error.message);
      }
    };
    loadAvatar();
  }, [userId]);

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <RNPAvatar.Image
          source={{uri: tempSource || uploadsUrl + avatar}}
          {...rest}
        />
      </TouchableOpacity>
    );
  }

  return (
    <RNPAvatar.Image
      source={{uri: tempSource || uploadsUrl + avatar}}
      {...rest}
    />
  );
};

export default Avatar;
