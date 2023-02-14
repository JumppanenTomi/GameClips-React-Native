import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.item}>
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      ></Image>
      <View style={styles.text}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  item:{
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#25253B",
    marginRight: 8,
    borderRadius: 20,
  },

  image:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 300,
    height: 170,
  },

  text:{
    width: 300,
    padding: 12,
  },

  title:{
    fontSize: 18,
    color: "#ffffff"
  }
});
