import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {useMedia} from 'hooks/ApiHooks';
import Text from 'components/atoms/Text';
import Separator from 'components/atoms/Separator';
import MediaCard from 'components/organisms/MediaCard';
import Icon from 'components/atoms/Icon';

const NewestList = () => {
  const {mediaArray} = useMedia();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text type="title">Newest Clips </Text>
        <Icon label="arrow-next" size={20} />
      </TouchableOpacity>
      <Separator height={16} />
      <View style={{flex: 1}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <MediaCard singleMedia={item} style={styles.card} />}
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
  }, 
  card: {
    marginRight: 8
  }
});

export default NewestList;
