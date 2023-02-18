import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {appId, uploadsUrl} from '../../../utils/variables';
import {useTag} from "../../../hooks/ApiHooks";
import {useUser} from "../../../hooks/ApiHooks";
import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItem = ({singleMedia, navigation}) => {
  const {getFilesByTag} =useTag();
  const {getUserById} = useUser();
  const {getTagsById} = useTag();

  const [avatar, setAvatar] = useState('5760');
  const [owner, setOwner] = useState({});
  const [tags, setTags] = useState([]);

  const item = singleMedia;

  const loadAvatar = async (id) => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      setAvatar('4254c98a7ccd66d74ff4179b3d9df713.png');
    }
  };

  const loadTags = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const tags = await getTagsById(token, id);
      setTags(tags);
    } catch (error) {
      setAvatar('4254c98a7ccd66d74ff4179b3d9df713.png');
    }
  };

  const getOwner = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(token, userId);
    setOwner(owner);
  };

useEffect(()=>{
  loadAvatar(item.user_id)
  getOwner(item.user_id)
  loadTags(item.file_id)
}, []);

  return (
    <TouchableOpacity style={styles.item} onPress={()=>{
      navigation.navigate('Single', item)
    }
    }>
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      ></Image>
      <View style={styles.text}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image style={styles.tinyProfileImage} source={{uri: uploadsUrl + avatar}}/>
          <Text style={styles.title}>@{owner.username}</Text>
        </View>
        <View style={{flexDirection: "row", overflow: "hidden"}}>
          {tags.map((item, index) => {
            if (item.tag === appId) {
              return null; // Skip rendering this object
            } else {
              return (
                <View key={index} style={styles.tagContainer}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  item:{
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#25253B",
    marginRight: 8,
    borderRadius: 20,
  },

  image:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 300,
    height: 170,
  },

  tinyProfileImage:{
    borderRadius: 50,
    width: 24,
    height: 24,
    marginTop: 8,
    marginRight: 8
  },

  text:{
    width: 300,
    padding: 12,
  },

  tagText:{
    fontSize: 16,
    color: "#ffffff",
    alignSelf: "flex-start",
  },

  tagContainer:{
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 16,
    marginRight: 4,
    backgroundColor: "#0D0D25",
    borderRadius: 100,
  },

  title:{
    fontSize: 18,
    color: "#ffffff"
  }
});
