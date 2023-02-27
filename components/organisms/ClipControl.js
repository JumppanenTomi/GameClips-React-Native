import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Share, View } from 'react-native';
import IconButton from '../atoms/IconButton';
import Text from '../atoms/Text';
import useLikes from 'hooks/useLikes';
import Avatar from '../atoms/Avatar';
import PropTypes from 'prop-types';
import Separator from 'components/atoms/Separator';
import { uploadsUrl } from 'utils/variables';

const ClipControl = ({ userId, fileId, filename, handleSheet }) => {
  const sheetRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { addLike, removeLike, getFileLikes } = useLikes();

  useEffect(() => {
    const initLikes = async () => {
      const likes = await getFileLikes(fileId);
      setLikeCount(likes.length);
      setIsLiked(likes.some(item => item.file_id === fileId));
    }

    initLikes();
  }, [])

  const handleLike = () => {
    if (isLiked) {
      removeLike(fileId);
      setLikeCount(likeCount - 1);
    } else {
      addLike(fileId);
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  }

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: uploadsUrl + filename,
      });
      if (result.action === Share.sharedAction) {
        console.log("Sharing");
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing canceled');
      }
    } catch (error) {
      alert('Error occurred while sharing');
      console.log(error)
    }
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'papayawhip',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <View style={styles.container}>
        <Avatar userID={userId} size={32} />
        <Separator height={24} />
        <IconButton label={isLiked ? 'heart-fill' : 'heart'} size={32} onPress={handleLike} />
        <Text type="meta" style={{ fontWeight: 'bold', marginTop: -3 }}>
          {likeCount}
        </Text>
        <Separator height={8} />
        <IconButton label="message" active={true} size={32} onPress={handleSheet} />
        <Separator height={8} />
        <IconButton label="share" active={true} size={32} onPress={handleShare} />
      </View>

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
  userId: PropTypes.number.isRequired,
  fileId: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
}

export default ClipControl;
