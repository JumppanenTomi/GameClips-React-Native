import React, { useRef, useState } from 'react';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ClipControl from 'components/organisms/ClipControl';
import ClipMeta from 'components/organisms/ClipMeta';
import ClipSheet from 'components/organisms/ClipSheet';

const Single = ({ route, navigation }) => {
  const [status, setStatus] = useState({});
  const [isHidden, toggleHidden] = useState(true);
  const { title, description, filename, user_id: userId, file_id: fileId } = route.params;
  const { height, width } = Dimensions.get('window');


  const video = useRef(null);
  const handleVideoPress = () => {
    if (status.isPlaying && isHidden) {
      video.current.pauseAsync();
    } else if (isHidden) {
      video.current.playAsync();
    } else {
      Keyboard.dismiss();
      toggleHidden(true);
    }
  };

  const sheetRef = useRef(null);
  const handleSheet = () => {
    sheetRef.current.snapTo(450);
  }

  return (
    <SafeAreaView style={{backgroundColor: '#000000', height: height, width: width}}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={handleVideoPress}
      >
        <Video
          ref={video}
          source={{ uri: uploadsUrl + filename }}
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
      <ClipControl userId={userId} fileId={fileId} filename={filename} handleSheet={handleSheet} />
      <ClipMeta userId={userId} title={title} description={description} />
      <ClipSheet fileId={fileId} sheetRef={sheetRef} />
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
export default Single;
