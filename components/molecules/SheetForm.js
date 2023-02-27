import PropTypes from 'prop-types';
import useComments from 'hooks/useComments';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Keyboard } from "react-native";
import { IconButton } from 'react-native-paper';
import FormInput from 'components/atoms/FormInput';
import Icon from 'components/atoms/Icon';
import Toast from 'react-native-toast-message';

const SheetForm = ({ fileId, reRender }) => {
  const { addComment } = useComments();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAdd = async (data) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormInput
          name="comment"
          label="Post a comment"
          rules={{ required: true }}
          control={control}
        />
      </View>
      <IconButton
        icon={() => <Icon label="send" color="#8C8AFA" />}
        mode="contained"
        containerColor="#8C8AFA"
        size={35}
        onPress={handleSubmit(handleAdd)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  form: {
    flex: 1,
    marginRight: 8
  }
})


SheetForm.propTypes = {
  fileId: PropTypes.number.isRequired,
  reRender: PropTypes.func.isRequired
}

export default SheetForm;