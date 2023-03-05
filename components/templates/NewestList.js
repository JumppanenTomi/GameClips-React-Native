import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {useMedia} from 'hooks/ApiHooks';
import ListItem from 'components/Lists/Items/HomeItem';
import Text from 'components/atoms/Text';
import Separator from 'components/atoms/Separator';
import MediaCard from 'components/organisms/MediaCard';
import Icon from 'components/atoms/Icon';
import IconButton from 'components/atoms/IconButton';

const NewestList = () => {
  const {mediaArray} = useMedia();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text type="body1">Newest Clips </Text>
        <Icon label="arrow-next" size={20} />
      </TouchableOpacity>
      <Separator height={16} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaArray.reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <MediaCard singleMedia={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
});

export default NewestList;
