import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../../../utils/variables';
import {useFavorites} from '../../../hooks/ApiHooks';
import {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from '../../functions/profile';
import Toast from 'react-native-toast-message';
import {MainContext} from "../../../contexts/MainContext";

const FavoriteListitem = ({singleMedia, navigation}) => {
  const [avatar, setAvatar] = useState('5760');
  const [owner, setOwner] = useState('');
  const { update, setUpdate } = useContext(MainContext);
  const item = singleMedia;

  const getData = async () => {
    setOwner(await profile().loadOwner(item.user_id));
    setAvatar(await profile().loadAvatar(item.user_id));
  };

  const deleteFavorite = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    Alert.alert(
      'Delete favorite',
      'Are you sure you want to delete this clip from favorites?',
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
              await useFavorites()
                .deleteFavorite(id, token)
              Toast.show({
                type: 'success',
                text1: 'Successfully deleted favorite',
                visibilityTime: 1500,
              });
              setUpdate(!update)
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error deleting favorite',
                text2: error,
                visibilityTime: 3000,
              });
            }
          },
        },
      ],
      {cancelable: true}
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TouchableOpacity
      style={styles.item}
      onLongPress={() => deleteFavorite(item.file_id)}
      onPress={() => {
        navigation.navigate('Single', item, navigation);
      }}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      ></Image>
      <View style={styles.data}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Image
            style={styles.tinyProfileImage}
            source={{uri: uploadsUrl + avatar}}
          />
          <Text style={styles.poster}>@{owner}</Text>
        </View>
      </View>
      <Toast />
    </TouchableOpacity>
  );
};

FavoriteListitem.propTypes = {
  singleMedia: PropTypes.object,
};

export default FavoriteListitem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#25253B',
    marginBottom: 16,
    borderRadius: 20,
  },

  image: {
    borderRadius: 20,
    flex: 3,
  },

  tinyProfileImage: {
    borderRadius: 50,
    width: 24,
    height: 24,
    marginRight: 8,
  },
  poster: {
    fontSize: 18,
    color: '#ffffff',
  },
  data: {
    flex: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8,
  },
});
