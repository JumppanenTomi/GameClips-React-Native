import {StyleSheet, SafeAreaView, Image, View, ScrollView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import Text from '../components/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext, useState} from "react";
import Newest from "../components/Lists/Home/Newest";
import {uploadsUrl} from "../utils/variables";
import {useTag} from "../hooks/ApiHooks";
import TagList from "../components/Lists/Home/TagList";
import Browse from "../components/Lists/Home/Browse";

const Home = ({navigation}) => {
  const {getFilesByTag} =useTag();

  const {user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const loadAvatar = async (id) => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  loadAvatar(user.user_id)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.ProfileContainer}>
        <Image style={styles.profileImage} source={{uri: uploadsUrl + avatar}} />
        <View style={styles.text}>
          <Text style={{fontSize: 14,}} type="brightSubHeading">Howdy,</Text>
          <Text style={{fontSize: 18,}} type="heading">{user.username}👋🏻</Text>
        </View>
        <Ionicons style={styles.video} name="md-videocam" size={30} color="#ffffff" />
      </View>
      <View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} type="heading">Newest clips</Text>
          <Ionicons style={styles.titleArrow} name="chevron-forward-outline" size={30} color="#ffffff" />
        </View>
        <Newest navigation={navigation}></Newest>
      </View>
      <View style={{paddingTop: 28}}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} type="heading">Browse clips</Text>
          <Ionicons style={styles.titleArrow} name="chevron-forward-outline" size={30} color="#ffffff" />
        </View>
        <View>
          <TagList navigation={navigation}></TagList>
        </View>
        <View style={{marginTop: 16}}>
          <Browse  navigation={navigation}></Browse>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25'
  },
  ProfileContainer:{
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24
  },
  profileImage:{
    width: 44,
    height: 44,
    marginRight: 12,
    borderRadius: '50%'
  },
  text:{
    flex: 2
  },
  section:{
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24
  },
  sectionTitle:{
    fontSize: 24,
  },
  titleArrow:{
    flex: 1,
  }
});

export default Home;

Home.propTypes = {
  navigation: PropTypes.object,
};
