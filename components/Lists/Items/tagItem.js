import {StyleSheet, TouchableOpacity, View,} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../Text';


const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.tag}>
        <Text style={styles.tagText} type="heading">{singleMedia.tag}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  tag:{
      marginRight: 8,
      borderRadius: 100,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.16)",
      flexDirection: "row",
      alignContent: "flex-end",
      justifyContent: "center",
  },
  tagText:{
      fontSize: 14,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
      marginBottom: 0,
  }
});
