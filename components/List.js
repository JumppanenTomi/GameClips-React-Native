import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './NewestClipsListItem';
import PropTypes from 'prop-types';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      horizontal
      data={mediaArray}
      style={{paddingLeft: 24, paddingRight: 24}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
