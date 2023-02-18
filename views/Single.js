import React, {useEffect, useRef, useState} from 'react';
import {useTag, useUser} from "../hooks/ApiHooks";
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {Video } from "expo-av";
import Text from "../components/Text";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Single = ({route}) => {
  const [avatar, setAvatar] = useState('');
  const [owner, setOwner] = useState('');

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const handleVideoPress = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  }
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
  } = route.params;

  const loadAvatar = async (id) => {
    try {
      const avatarArray = await useTag().getFilesByTag('avatar_' + id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      setAvatar('4254c98a7ccd66d74ff4179b3d9df713.png');
    }
  };

  const getOwner = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await useUser().getUserById(token, userId);
    setOwner(owner.username);
  };

  useEffect(()=>{
    loadAvatar(userId)
    getOwner(userId)
  }, []);

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
        <View style={styles.controlContainer}>
          <Image style={styles.tinyProfileImage} source={{uri: uploadsUrl + avatar}}/>
          <Ionicons style={styles.icon} onPress={() => {console.log("liked")}} name="heart" size={40} color="#ffffff" />
            <Ionicons style={styles.icon} onPress={() => {console.log("commented")}} name="chatbubble-ellipses" size={40} color="#ffffff" />
            <Ionicons style={styles.icon} onPress={() => {console.log("commented")}} name="share-social" size={40} color="#ffffff" />
        </View>
        <View style={styles.infoContainer}>
          <Text type="brightSubHeading" style={{fontSize: 16, fontWeight: '700'}}>@{owner}</Text>
          <Text type="brightSubHeading" style={{fontSize: 18,}}>{title}</Text>
          <Text style={{color: '#fff'}}>{description}</Text>
        </View>
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
