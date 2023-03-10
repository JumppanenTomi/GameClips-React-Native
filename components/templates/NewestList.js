import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMedia} from 'hooks/ApiHooks';
import Icon from 'components/atoms/Icon';
import MediaCard from 'components/organisms/MediaCard';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';

const NewestList = () => {
  const navigation = useNavigation();
  const {mediaArray} = useMedia();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('ClipList', {mediaArray: mediaArray})
        }
      >
        <Text type="title">Newest Clips </Text>
        <Icon label="arrow-next" size={20} />
      </TouchableOpacity>
      <Separator height={16} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <MediaCard singleMedia={item} style={styles.card} />
          )}
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
    marginRight: 8,
  },
});

export default NewestList;
