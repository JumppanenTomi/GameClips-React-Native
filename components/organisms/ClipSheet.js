import BottomSheet from 'reanimated-bottom-sheet';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from 'components/atoms/Text';
import { useEffect, useState } from 'react';
import useComments from 'hooks/useComments';
import FormInput from 'components/atoms/FormInput';
import { useForm } from 'react-hook-form';
import { IconButton } from 'react-native-paper';
import Icon from 'components/atoms/Icon';

const ClipSheet = ({ fileId, sheetRef }) => {
  const [comments, setComments] = useState([]);
  const { addComment, removeComment, getFileComments } = useComments();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getFileComments(fileId);
      setComments(comments);
    }

    fetchComments();
  }, []);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: '#25253B',
        height: 450,
      }}
    >
      <View style={styles.line} />
      <Text type="heading">Comments</Text>
      {comments.map((item) => (
        <TouchableOpacity
          key={item.comment_id}
          onLongPress={() => deleteComment(item.comment_id)}
        >
          <View style={styles.text}>
            <Text style={styles.comment}>
              <Text style={styles.poster}>{item.user_nickname}</Text>{' '}
              {item.comment}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.form}>
        <View style={{flex: 1, marginRight: 8}}>
        <FormInput
          name="comment"
          label="Post a comment"
          rules={{ required: true }}
          control={control}
        />
        </View>
        <IconButton icon={() => <Icon label="send" />} mode="contained" containerColor="#8C8AFA" style={{borderColor: 'red'}} size={35} />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[450, 0]}
      borderRadius={15}
      renderContent={renderContent}
    />
  )
}

const styles = StyleSheet.create({
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#9E9EA8',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  comment: {
    color: '#fff',
    fontSize: 16,
  },
  poster: {
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(255,255,255,0.51)',
  },
  text: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  }
})

export default ClipSheet;