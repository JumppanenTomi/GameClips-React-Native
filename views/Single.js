import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import Text from 'components/atoms/Text';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import profile from '../components/functions/profile';
import { useComments } from '../hooks/ApiHooks';
import FormInput from '../components/atoms/FormInput';
import { useForm } from 'react-hook-form';
import handleComment from '../components/functions/handleComment';
import Toast from 'react-native-toast-message';
import handleLikes from "../components/functions/handleLikes";
import ClipControl from 'components/organisms/ClipControl';
import ClipMeta from 'components/organisms/ClipMeta';
import ClipSheet from 'components/organisms/ClipSheet';

const Single = ({ route, navigation }) => {
  const scrollViewRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState({});
  const [isHidden, toggleHidden] = useState(true);
  const { title, description, filename, user_id: userId, file_id: fileId } = route.params;
  const [comment, setComment] = useState('');



  const video = useRef(null);



  const ScrollViewWithRef = forwardRef((props, ref) => {
    return <ScrollView {...props} ref={ref} />;
  });

  const handleInputChange = (inputValue) => {
    setComment(inputValue);
  };

  const { control } = useForm({
    defaultValues: { comment: '' },
  });

  const updateComments = async () => {
    try {
      const data = await useComments().getCommentsById(route.params.file_id);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].user_nickname = await profile().loadOwner(data[i].user_id);
        }
        setComments(data);
      } else {
        setComments([{ user_id: '', comment: 'No comments yet' }]);
      }
      console.log('Comments updated');
    } catch (error) {
      alert(error);
      console.error('commentUpdate', error);
    }
  };

  const addComment = async (id) => {
    try {
      Keyboard.dismiss();
      await handleComment().postComment(id, comment).then(updateComments);
      setComment('');
      Toast.show({
        type: 'success',
        text1: 'Comment successfully posted',
        visibilityTime: 1500,
      });
    } catch (error) {
      console.error('postComment', error);
      Toast.show({
        type: 'error',
        text1: 'Error posting comment',
        text2: error,
        visibilityTime: 3000,
      });
    }
  };

  const deleteComment = async (id) => {
    Keyboard.dismiss();
    Alert.alert(
      'Delete comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await handleComment().deleteComment(id).then(updateComments);
              Toast.show({
                type: 'success',
                text1: 'Successfully deleted',
                visibilityTime: 1500,
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error deleting comment',
                text2: error,
                visibilityTime: 3000,
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleContentSizeChange = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleLayout = () => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  };

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

  const commentStyles = StyleSheet.create({
    heading: {
      marginTop: 32,
      marginBottom: 18,
      fontSize: 18,
      color: '#fff',
    },
    scrollContainer: {
      width: '100%',
      height: 300,
    },
    commentContainer: {
      paddingLeft: 24,
      paddingRight: 24,
      position: 'absolute',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      display: isHidden ? 'none' : 'flex',
      zIndex: 99,
      width: '100%',
      bottom: 0,
      backgroundColor: '#25253B',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
  });

  const sheetRef = useRef(null);

  const handleSheet = () => {
    sheetRef.current.snapTo('50%');
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


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        style={commentStyles.commentContainer}
      >
        <Text style={commentStyles.heading}>Comments</Text>
        <ScrollViewWithRef
          style={commentStyles.scrollContainer}
          ref={scrollViewRef}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
        >
        </ScrollViewWithRef>

        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormInput
            name="Post a comment"
            label="Post a comment"
            onChangeText={handleInputChange}
            value={comment}
            rules={{ required: true }}
            control={control}
            style={{
              flex: 10,
              marginTop: 16,
              marginBottom: 16,
              backgroundColor: 0,
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              addComment(route.params.file_id);
            }}
          >
            <View
              style={{
                borderRadius: 60,
                backgroundColor: '#8C8AFA',
                width: 46,
                padding: 13,
                marginLeft: 8,
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              <Ionicons name="send" size={20} color="#ffffff" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  controlContainer: {
    bottom: 90,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    height: 50,
    bottom: 15,
    left: 10,
    position: 'absolute',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  icon: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  back: {
    position: 'absolute',
    marginTop: 40,
    marginBottom: 15,
    marginLeft: 10,
    top: 0,
    left: 0,
  },
  tinyProfileImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
export default Single;
