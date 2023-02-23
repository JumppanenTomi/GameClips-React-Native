import React, { useEffect, useState } from 'react';
import { StyleSheet, Share, View } from 'react-native';
import IconButton from '../atoms/IconButton';
import Text from '../atoms/Text';
import useLikes from 'hooks/useLikes';
import Avatar from '../atoms/Avatar';
import PropTypes from 'prop-types';
import Separator from 'components/atoms/Separator';
import { uploadsUrl } from 'utils/variables';

const ClipControl = ({ fileId, fileName, userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [fileLikes, setFileLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const { addLike, removeLike, getFileLikes } = useLikes();

  useEffect(() => {
    const initLikes = async () => {
      const result = await getFileLikes(fileId);
      console.log(result)
      setFileLikes(result);
      setLikeCount(result.length);
      setIsLiked(result.some(item => item.file_id === fileId));
    }

    initLikes();
  }, [])

  const handleLike = async () => {
    if (isLiked) {
      await removeLike(fileId);
    } else {
      await addLike(fileId);
    }
    setIsLiked(!isLiked);
  }

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: uploadsUrl + fileName,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert('Successful sharing');
        } else {
          alert('Sharing canceled');
        }
      } else if (result.action === Share.dismissedAction) {
        alert('Sharing canceled');
      }
    } catch (error) {
      alert('Error occurred while sharing');
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>
      <Avatar userID={userId} size={32} />
      <Separator height={24} />
      <IconButton label="favorites" active={isLiked} size={32} onPress={handleLike} />
      <Text type="meta">
        {likeCount}
      </Text>
      <Separator height={8} />
      <IconButton label="message" active={true} size={32} onPress={async () => {
        video.current.pauseAsync();
        toggleHidden(false);
        await updateComments();
      }} />
      <Separator height={8} />
      <IconButton label="share" active={true} size={32} onPress={handleShare} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    bottom: 90,
    right: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',

  }
})


ClipControl.propTypes = {
  fileId: PropTypes.number.isRequired
}

export default ClipControl;