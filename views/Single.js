import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Video} from 'expo-av';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import ClipControl from 'components/organisms/ClipControl';
import ClipMeta from 'components/organisms/ClipMeta';
import ClipSheet from 'components/organisms/ClipSheet';
import ClipActionSheet from 'components/organisms/ClipActionSheet';
import Icon from 'components/atoms/Icon';

const Single = ({route, navigation, height}) => {
  const [status, setStatus] = useState({});
  const {
    title,
    description,
    filename,
    user_id: userId,
    file_id: fileId,
  } = route.params;

  const video = useRef(null);
  const handleVideoPress = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  const sheetRef = useRef(null);
  const actionSheetRef = useRef(null);
  const handleSheet = () => {
    sheetRef.current?.snapTo(1);
  };

  const handleActionSheet = () => {
    actionSheetRef.current?.snapTo(1);
  };

  return (
    <View style={{backgroundColor: '#000000', height: height}}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={handleVideoPress}
      >
        <Video
          ref={video}
          source={{uri: uploadsUrl + filename}}
          style={styles.video}
          useNativeControls={false}
          resizeMode="contain"
          onError={(error) => {
            console.log(error);
          }}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableOpacity>
      <IconButton
        style={styles.iconBack}
        icon={() => <Icon label="arrow-back" size={35} />}
        onPress={() => navigation.goBack()}
      />
      <ClipControl
        userId={userId}
        fileId={fileId}
        filename={filename}
        handleSheet={handleSheet}
        handleActionSheet={handleActionSheet}
      />
      <ClipMeta userId={userId} title={title} description={description} />
      <ClipSheet fileId={fileId} sheetRef={sheetRef} />
      <ClipActionSheet
        fileId={fileId}
        filename={filename}
        title={title}
        description={description}
        actionSheetRef={actionSheetRef}
      />
    </View>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  iconBack: {
    position: 'absolute',
    top: 50,
    left: 8,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
export default Single;
