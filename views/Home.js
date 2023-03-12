import {useContext} from 'react';
import {MainContext} from 'contexts/MainContext';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Avatar from 'components/atoms/Avatar';
import BrowseList from 'components/templates/BrowseList';
import IconButton from 'components/atoms/IconButton';
import NewestList from 'components/templates/NewestList';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';

const Home = ({navigation}) => {
  const {user} = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.header}>
            <Avatar userId={user.user_id} size={44} />
            <View style={styles.headerText}>
              <Text type="subTitle">Howdy,</Text>
              <Text type="title">{user.username} 👋🏻</Text>
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
    backgroundColor: '#0D0D25',
    paddingTop: 50,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerText: {
    flex: 2,
    marginLeft: 12,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
