import {StyleSheet, SafeAreaView, Image, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import Text from '../components/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext} from "react";
import List from "../components/List";

const Home = ({navigation}) => {
  const {user} = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ProfileContainer}>
        <Image style={styles.profileImage} source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nyan_cat_250px_frame.PNG/220px-Nyan_cat_250px_frame.PNG'}} />
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
        <List navigation={navigation}></List>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25'
  },
  ProfileContainer:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24
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
