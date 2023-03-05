import {FlatList} from 'react-native';
import {useMedia} from '../../../hooks/ApiHooks';
import ListItem from '../Items/HomeItem';
import PropTypes from 'prop-types';

const Newest =  ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={mediaArray.reverse()}
      style={{paddingLeft: 24, paddingRight: 24}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} filter={false}/>
      )}
    />
  );
};

Newest.propTypes = {
  navigation: PropTypes.object,
};

export default Newest;
