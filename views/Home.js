import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import Text from '../components/atoms/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext, useEffect, useState} from 'react';
import TagList from '../components/Lists/Home/TagList';
import Browse from '../components/Lists/Home/Browse';
import profile from '../components/functions/profile';
import Avatar from 'components/atoms/Avatar';
import IconButton from 'components/atoms/IconButton';
import NewestList from 'components/templates/NewestList';
import Separator from 'components/atoms/Separator';

const Home = ({navigation}) => {
  const {user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const getData = async () => {
    setAvatar(await profile().loadAvatar(user.user_id));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.headerContainer}>
            <Avatar userID={user.user_id} size={44} />
            <View style={styles.text}>
              <Text style={{fontSize: 14}} type="brightSubHeading">
                Howdy,
              </Text>
              <Text style={{fontSize: 18}} type="heading">
                {user.username} 👋🏻
              </Text>
            </View>
            <IconButton
              label="video"
              size={25}
              onPress={() => navigation.navigate('Upload')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Separator height={32} />
        <NewestList />
        <Separator height={32} />
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle} type="heading">
              Browse clips
            </Text>
            <Ionicons
              style={styles.titleArrow}
              name="chevron-forward-outline"
              size={30}
              color="#ffffff"
            />
          </View>
          <View>
            <TagList navigation={navigation}></TagList>
          </View>
          <View style={{marginTop: 16, marginBottom: 120}}>
            <Browse navigation={navigation}></Browse>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
  },
  view: {
    paddingTop: 50,
    paddingBottom: 90,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  text: {
    flex: 2,
    marginLeft: 12,
  },
  section: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
  },
  sectionTitle: {
    fontSize: 24,
  },
  titleArrow: {
    flex: 1,
  },
});

export default Home;

Home.propTypes = {
  navigation: PropTypes.object,
};
