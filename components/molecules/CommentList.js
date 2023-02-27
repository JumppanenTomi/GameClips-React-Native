import PropTypes from 'prop-types';
import useComments from 'hooks/useComments';
import { StyleSheet, View, TouchableOpacity, Keyboard, Alert } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import Text from "components/atoms/Text";
import Toast from 'react-native-toast-message';

const CommentList = ({ comments, reRender }) => {
  const { removeComment } = useComments();

  const handleRemove = async (commentId) => {
    Keyboard.dismiss();
    Alert.alert(
      'Delete comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeComment(commentId);
              reRender({});
              Toast.show({
                type: 'success',
                text1: 'Successfully deleted',
                visibilityTime: 1500,
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error deleting comment',
                text2: error,
                visibilityTime: 3000,
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        style={styles.list}
        fadingEdgeLength={90}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.comment_id}
            onLongPress={() => handleRemove(item.comment_id)}
          >
            <Text style={styles.textComment}>
              <Text style={styles.textUsername}>{item.user.username}</Text>
              {'    '}
              {item.comment}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 90,
  },
  textUsername: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.51)',
  },
  textComment: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 10,
  },
})

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  reRender: PropTypes.func.isRequired
}

export default CommentList;