import {useTag, useUser} from "../../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profile =  () => {
  const loadAvatar = async (id) => {
    try {
      const avatarArray = await useTag().getFilesByTag('avatar_' + id);
      return avatarArray.pop().filename;
    } catch (error) {
      return '4254c98a7ccd66d74ff4179b3d9df713.png';
    }
  };

  const loadOwner = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await useUser().getUserById(token, userId);
    return owner.username;
  };

  return {loadOwner,loadAvatar}
};

export default profile;
