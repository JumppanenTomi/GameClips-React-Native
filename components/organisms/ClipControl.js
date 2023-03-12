import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Share, View, Alert} from 'react-native';
import IconButton from '../atoms/IconButton';
import Text from '../atoms/Text';
import Avatar from '../atoms/Avatar';
import PropTypes from 'prop-types';
import Separator from 'components/atoms/Separator';
import {uploadsUrl} from 'utils/variables';
import {MainContext} from '../../contexts/MainContext';
import handleLikes from '../functions/handleLikes';

const ClipControl = ({
  userId,
  fileId,
  filename,
  handleSheet,
  handleActionSheet,
}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [like, toggleLike] = useState(false);
  const [likeCount, countLikes] = useState(0);

  useEffect(() => {
    updateLikes();
  }, [1]);

  const updateLikes = async () => {
    try {
      const likes = await handleLikes().getUserLikes();
      toggleLike(likes.some((item) => item.file_id === fileId));
      const count = await handleLikes().countFileLikes(fileId);
      countLikes(count.length); //how many likes
      console.log('Likes updated');
    } catch (error) {
      alert(error);
      console.error('avatarUpdate', error);
    }
  };

  const toggleLikes = async () => {
    if (like) {
      await handleLikes().dislike(fileId);
      await updateLikes();
      console.log('disliked');
    } else if (!like) {
      await handleLikes().like(fileId);
      await updateLikes();
      console.log('liked');
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: uploadsUrl + filename,
      });
      if (result.action === Share.sharedAction) {
        console.log('Sharing');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing canceled');
      }
    } catch (error) {
      alert('Error occurred while sharing');
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'papayawhip',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        <Avatar userId={userId} size={32} />
        <Separator height={24} />
        <IconButton
          label={like ? 'heart-fill' : 'heart'}
          size={32}
          onPress={toggleLikes}
        />
        <Text type="meta" style={{fontWeight: 'bold', marginTop: -5}}>
          {likeCount}
        </Text>
        <Separator height={12} />
        <IconButton
          label="message"
          active={true}
          size={32}
          onPress={handleSheet}
        />
        <Separator height={8} />
        <IconButton
          label="share"
          active={true}
          size={32}
          onPress={handleShare}
        />
        <Separator height={8} />
        <IconButton
          label="more"
          active={true}
          size={32}
          onPress={handleActionSheet}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 90,
    right: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

ClipControl.propTypes = {
  userId: PropTypes.number.isRequired,
  fileId: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
};

export default ClipControl;
