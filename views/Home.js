import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../components/atoms/Text';
import profile from '../components/functions/profile';
import Avatar from 'components/atoms/Avatar';
import IconButton from 'components/atoms/IconButton';
import NewestList from 'components/templates/NewestList';
import Separator from 'components/atoms/Separator';
import BrowseList from 'components/templates/BrowseList';

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
          <View style={styles.header}>
            <Avatar userID={user.user_id} size={44} />
            <View style={styles.text}>
              <Text type="subTitle">
                Howdy,
              </Text>
              <Text type="title">
                {user.username} 👋🏻
              </Text>
            </View>
            <IconButton
              label="video"
              size={27}
              onPress={() => navigation.navigate('Upload')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Separator height={32} />
        <NewestList />
        <Separator height={32} />
        <BrowseList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#0D0D25',
    paddingTop: 50,
    paddingBottom: 90
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  text: {
    flex: 2,
    marginLeft: 12,
  },
});

export default Home;