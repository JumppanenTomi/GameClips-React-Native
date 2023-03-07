import {FlatList, View} from 'react-native';
import {useMedia} from '../../../hooks/ApiHooks';
import ListItem from '../Items/HomeItem';
import PropTypes from 'prop-types';

const Browse =  ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <View style={{marginTop: 16, marginBottom: 120}}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={mediaArray}
      style={{paddingLeft: 24, paddingRight: 24}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} filter={true}/>
      )}
    />
    </View>
  );
};

Browse.propTypes = {
  navigation: PropTypes.object,
};

export default Browse;
