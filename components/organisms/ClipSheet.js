import {useEffect, useState} from 'react';
import useComments from 'hooks/useComments';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import FormInput from 'components/atoms/FormInput';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import Toast from 'react-native-toast-message';

const ClipSheet = ({fileId, sheetRef}) => {
  const [comments, setComments] = useState([]);
  const [render, reRender] = useState({});
  const {addComment, removeComment, getFileComments} = useComments();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getFileComments(fileId);
      setComments(comments);
    };
    fetchComments();
  }, [render]);

  const handleAddComment = async (data) => {
    try {
      Keyboard.dismiss();
      await addComment(fileId, data.comment);
      reset();
      reRender({});
      Toast.show({
        type: 'success',
        text1: 'Comment successfully posted',
        visibilityTime: 1500,
      });
    } catch (error) {
      console.error('postComment', error);
      Toast.show({
        type: 'error',
        text1: 'Error posting comment',
        text2: error,
        visibilityTime: 3000,
      });
    }
  };

  const handleRemoveComment = async (commentId) => {
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
      {cancelable: true}
    );
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.headerContainer}>
        <Text type="body" style={styles.headerTitle}>
          Comments
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon label="profile-fill" size={16} />
          <Text type="body" style={styles.headerCommentCount}>
            {comments.length}
          </Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          fadingEdgeLength={90}
          data={comments}
          style={styles.commentList}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.comment_id}
              onLongPress={() => handleRemoveComment(item.comment_id)}
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

      <View style={styles.formComment}>
        <View style={{flex: 1, marginRight: 8}}>
          <FormInput
            name="comment"
            label="Post a comment"
            rules={{required: true}}
            control={control}
          />
        </View>
        <IconButton
          icon={() => <Icon label="send" color="#8C8AFA" />}
          mode="contained"
          containerColor="#8C8AFA"
          size={35}
          onPress={handleSubmit(handleAddComment)}
        />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0, 450]}
      borderRadius={15}
      renderContent={renderContent}
      enabledInnerScrolling={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25253B',
    height: 450,
  },
  line: {
    width: 60,
    height: 3,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 100,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerCommentCount: {
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  commentList: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 90,
  },
  textComment: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 10,
  },
  textUsername: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.51)',
  },
  text: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  formComment: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
});

export default ClipSheet;
