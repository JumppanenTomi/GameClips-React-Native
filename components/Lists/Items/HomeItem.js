import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../../../utils/variables';
import {useTag} from "../../../hooks/ApiHooks";
import {useUser} from "../../../hooks/ApiHooks";
import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItem = ({singleMedia}) => {
  const {getFilesByTag} =useTag();
  const {getUserById} = useUser();

  const [avatar, setAvatar] = useState('5760');
  const [owner, setOwner] = useState({});

  const item = singleMedia;

  const loadAvatar = async (id) => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + id);
      setAvatar(avatarArray.pop().filename);
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
  loadAvatar(item.user_id);
  getOwner(item.user_id);
}, []);

  return (
    <TouchableOpacity style={styles.item}>
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      ></Image>
      <View style={styles.text}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image style={styles.tinyProfileImage} source={{uri: uploadsUrl + avatar}}/>
          <Text style={styles.title}>{owner.username}</Text>
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
  },

  image:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 300,
    height: 170,
  },

  tinyProfileImage:{
    width: 24,
    height: 24,
    marginTop: 8,
    marginRight: 8
  },

  text:{
    width: 300,
    padding: 12,
  },

  title:{
    fontSize: 18,
    color: "#ffffff"
  }
});
