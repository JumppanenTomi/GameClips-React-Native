import React, { useRef, useState } from 'react';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import ClipControl from 'components/organisms/ClipControl';
import ClipMeta from 'components/organisms/ClipMeta';
import ClipSheet from 'components/organisms/ClipSheet';
import Icon from 'components/atoms/Icon';
import Toast from 'react-native-toast-message';

const Single = ({ route, navigation }) => {
  const [status, setStatus] = useState({});
  const [isHidden, toggleHidden] = useState(true);
  const { title, description, filename, user_id: userId, file_id: fileId } = route.params;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={handleVideoPress}
      >
        <Video
          ref={video}
          source={{ uri: uploadsUrl + filename }}
          style={styles.video}
          useNativeControls={false}
          shouldPlay
          resizeMode="contain"
          onError={(error) => {
            console.log(error);
          }}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableOpacity>
      <IconButton style={styles.iconBack} icon={() => <Icon label="arrow-back" size={35} />} onPress={() => navigation.goBack()} />

      <ClipControl userId={userId} fileId={fileId} filename={filename} handleSheet={handleSheet} />
      <ClipMeta userId={userId} title={title} description={description} />
      <ClipSheet fileId={fileId} sheetRef={sheetRef} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  iconBack: {
    position: 'absolute',
    top: 50,
    left: 8
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
export default Single;
