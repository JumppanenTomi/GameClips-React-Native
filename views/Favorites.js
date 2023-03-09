import {StyleSheet, SafeAreaView, View} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../components/atoms/Text';
import FavoritesList from 'components/templates/FavoritesList';
import Separator from 'components/atoms/Separator';

const Favorites = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text type="heading" style={{fontSize: 24, paddingHorizontal: 24}}>
        Favorites
      </Text>
      <Separator height={18} />
      <View style={{flex: 1}}>
        <FavoritesList navigation={navigation}></FavoritesList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 100,
    backgroundColor: '#0D0D25',
  },
  title: {
    fontSize: 24,
    marginTop: 32,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 32,
  },
});

export default Favorites;

Favorites.propTypes = {
  navigation: PropTypes.object,
};
