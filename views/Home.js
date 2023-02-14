import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is a test</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;

Home.propTypes = {
  navigation: PropTypes.object,
};