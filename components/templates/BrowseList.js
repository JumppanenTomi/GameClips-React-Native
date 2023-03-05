import {FlatList} from 'react-native';
import {useMedia} from 'hooks/ApiHooks';
import ListItem from 'components/';
import PropTypes from 'prop-types';

const BrowseList = ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={mediaArray}
      style={{paddingLeft: 24, paddingRight: 24}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

Browse.propTypes = {
  navigation: PropTypes.object,
};

export default BrowseList;
