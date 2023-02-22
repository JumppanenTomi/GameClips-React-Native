import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {Video } from "expo-av";
import Text from "../components/atoms/Text";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import shareClip from "../components/functions/shareClip";
import profile from "../components/functions/profile";
import {useComments} from "../hooks/ApiHooks";
import FormInput from "../components/atoms/FormInput";
import {useForm} from "react-hook-form";
import handleComment from "../components/functions/handleComment";
import Toast from 'react-native-toast-message';


const ScrollViewWithRef = forwardRef((props, ref) => {
  return (
    <ScrollView {...props} ref={ref} />
  );
});

const Single = ({route, navigation}) => {
  const scrollViewRef = useRef(null);
  const [avatar, setAvatar] = useState('');
  const [owner, setOwner] = useState('');
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState({});
  const [isHidden, toggleHidden] = useState(true)
  const {title, description, filename, user_id: userId,} = route.params;
  const video = useRef(null);
  const [comment, setComment] = useState('');

  const handleInputChange = (inputValue) => {
    setComment(inputValue);
  };

  const {
    control,
  } = useForm({
    defaultValues: {comment: ''},
  });

  const updateData = async ()=>{
    setAvatar(await profile().loadAvatar(userId));
    setOwner(await profile().loadOwner(userId));
    setComments(await useComments().getCommentsById(route.params.file_id));
  }
  useEffect( () => {
    updateData();
  }, []);

  const addComment = async ()=>{
    try {
      const data = await handleComment().postComment(5830, comment).then(updateData)
      setComment('');
      Toast.show({type: 'success', text1: data.message, visibilityTime: 1500,})
    }catch (error){
      Toast.show({type: 'error', text1: "Error adding comment", visibilityTime: 3000,});
    }
  }

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
    } else{
      Keyboard.dismiss()
      toggleHidden(true)
    }
  }

  const commentStyles = StyleSheet.create({
    heading:{
      marginTop: 32,
      marginBottom: 18,
      fontSize: 18,
      color: '#fff'
    },
    scrollContainer:{
      width: "100%",
      minHeight: 300,
    },
    comment:{
      color: "#fff",
      fontSize: 16
    },
    poster:{
      fontWeight: "700",
      fontSize: 16,
      color: "rgba(255,255,255,0.51)",
    },
    text:{
      width: "100%",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    commentContainer: {
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 10,
      position: "absolute",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      display: isHidden ? 'none' : 'flex',
      zIndex: 99,
      maxHeight: "20%",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#25253B",
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  })

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <TouchableOpacity style={styles.videoContainer} onPress={handleVideoPress}>
        <Video
          ref={video}
          source={{uri: uploadsUrl + filename}}
          style={styles.video}
          useNativeControls={false}
          shouldPlay
          resizeMode="contain"
          onError={(error) => {
            console.log(error);
          }}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </TouchableOpacity>
      <Ionicons style={styles.back} onPress={() => {navigation.goBack()}} name="chevron-back-outline" size={40} color="#ffffff" />
      <View style={styles.controlContainer}>
            <Image style={styles.tinyProfileImage} source={{uri: uploadsUrl + avatar}}/>
            <Ionicons style={styles.icon} onPress={() => {console.log("liked")}} name="heart" size={40} color="#ffffff" />
            <Ionicons style={styles.icon} onPress={() => {toggleHidden(false)}} name="chatbubble-ellipses" size={40} color="#ffffff" />
            <Ionicons style={styles.icon} onPress={() => {shareClip().onShare(uploadsUrl+filename)}} name="share-social" size={40} color="#ffffff" />
        </View>
      <View style={styles.infoContainer}>
          <Text type="brightSubHeading" style={{fontSize: 16, fontWeight: '700'}}>@{owner}</Text>
          <Text type="brightSubHeading" style={{fontSize: 18,}}>{title}</Text>
          <Text style={{color: '#fff'}}>{description}</Text>
        </View>
      <View style={{paddingLeft: 24, position: "absolute", display: isHidden ? 'none' : 'flex', height: "10%", bottom: 0, left: 0, right: 0, backgroundColor: "#25253B",}}>
        <Text></Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
      <View style={commentStyles.commentContainer}>
        <Text style={commentStyles.heading}>Comments</Text>
        <ScrollViewWithRef style={commentStyles.scrollContainer} ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} onLayout={handleLayout}>
          {comments.map((item) => (
            <View style={commentStyles.text} key={item.comment_id}>
              <Text style={commentStyles.comment}>
                <Text style={commentStyles.poster}>{item.user_id}</Text> {item.comment}
              </Text>
            </View>
          ))}
        </ScrollViewWithRef>

        <View style={{width: "100%", flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <FormInput
            name="Post a comment"
            label="Post a comment"
            onChangeText={handleInputChange}
            value={comment}
            rules={{required: true}}
            control={control}
            style={{flex: 10, marginTop: 16, marginBottom: 16, backgroundColor: 0}}
          />
          <View style={{borderRadius: 60,backgroundColor: "#8C8AFA", width: 46, padding: 13, marginLeft: 8, marginTop: 16, marginBottom: 16, }}>
            <Ionicons onPress={() => {addComment()}} name="send" size={20} color="#ffffff" />
          </View>
        </View>
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
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  controlContainer: {
    height: 150,
    top: "60%",
    right: 0,
    position: "absolute",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  infoContainer: {
    height: 50,
    bottom: 15,
    left: 10,
    position: "absolute",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  icon:{
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  back:{
    position: "absolute",
    marginTop: 40,
    marginBottom: 15,
    marginLeft: 10,
    top:0,
    left:0
  },
  tinyProfileImage:{
    borderRadius: 50,
    width: 40,
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  video:{
    width: '100%',
    height: '100%'
  }
});
export default Single;
