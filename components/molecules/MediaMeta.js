import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import {StyleSheet, View} from 'react-native';
import Separator from '../atoms/Separator';

const MediaMeta = ({singleMedia}) => {
  const item = singleMedia;

  return (
    <>
      <Text type="meta">{item.description}</Text>
      <Separator height={8} />
      <View style={styles.container}>
        <Avatar size={24} userID={item.user_id} />
        <Text type="meta" style={styles.text}>
          {item.user_id}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    flex: 1,
  },
});

export default MediaMeta;
