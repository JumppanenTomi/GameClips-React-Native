import React, { useRef, useState } from 'react';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import ClipControl from 'components/organisms/ClipControl';
import ClipMeta from 'components/organisms/ClipMeta';
import ClipSheet from 'components/organisms/ClipSheet';

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
      <Ionicons
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
        name="chevron-back-outline"
        size={40}
        color="#ffffff"
      />

      <ClipControl userId={userId} fileId={fileId} filename={filename}  handleSheet={handleSheet} />
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
  back: {
    position: 'absolute',
    marginTop: 40,
    marginBottom: 15,
    marginLeft: 10,
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
export default Single;
