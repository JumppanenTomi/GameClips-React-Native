import {Alert, FlatList, Keyboard} from 'react-native';
import {useMedia} from '../../../hooks/ApiHooks';
import PropTypes from 'prop-types';
import FavoriteListitem from "../Items/FavoriteListItem";

const FavoritesList =  ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      style={{paddingLeft: 24, paddingRight: 24,}}
      renderItem={({item}) => (
        <FavoriteListitem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

FavoritesList.propTypes = {
  navigation: PropTypes.object,
};

export default FavoritesList;
