import {StyleSheet, View, Alert} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {List} from 'react-native-paper';
import Icon from 'components/atoms/Icon';
import {useFavorites, useMedia} from 'hooks/ApiHooks';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import {uploadsUrl} from 'utils/variables';

const ClipActionSheet = ({fileId, filename, title, description, actionSheetRef}) => {
  const {removeMedia} = useMedia();
  const {addFavorite} = useFavorites();
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditClip', {fileId, title, description});
  };

  const handleAddToFavorite = async () => {
    try {
      await addFavorite(fileId);
      Toast.show({
        type: 'success',
        text1: 'Successfully added to favorites',
        visibilityTime: 1500,
      });
      //setUpdate(!update);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error.message,
        text2: 'Clip might already be added to favorites.',
        visibilityTime: 3000,
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(uploadsUrl + filename);
      Toast.show({
        type: 'success',
        text1: 'Link copied',
        visibilityTime: 1500,
      });
      actionSheetRef.current.snapTo(0);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 3000,
      });
    }
  };

  const handleRemove = async () => {
    Alert.alert(
      'Delete media',
      'Are you sure you want to delete this clip?',
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
              await removeMedia(fileId);
              Toast.show({
                type: 'success',
                text1: 'Successfully deleted',
                visibilityTime: 1500,
              });
              navigation.goBack();
            } catch (error) {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: error.message,
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
      <View style={styles.list}>
        <List.Item
          title="Edit"
          titleStyle={{color: '#FFF'}}
          left={(props) => <Icon label="edit" />}
          onPress={handleEdit}
        />
        <List.Item
          title="Add to favorites"
          titleStyle={{color: '#FFF'}}
          left={(props) => <Icon label="heart-add" />}
          onPress={handleAddToFavorite}
        />
        <List.Item
          title="Copy media link"
          titleStyle={{color: '#FFF'}}
          left={(props) => <Icon label="link" />}
          onPress={handleCopyLink}
        />
        <List.Item
          title="Delete"
          titleStyle={{color: '#E41E1E'}}
          left={(props) => <Icon label="trash" color="#E41E1E" />}
          onPress={handleRemove}
        />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={actionSheetRef}
      snapPoints={[0, 250]}
      borderRadius={15}
      renderContent={renderContent}
      enabledInnerScrolling={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25253B',
    height: 250,
  },
  line: {
    width: 60,
    height: 3,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 100,
  },
  list: {
    paddingHorizontal: 16,
  },
});

export default ClipActionSheet;
