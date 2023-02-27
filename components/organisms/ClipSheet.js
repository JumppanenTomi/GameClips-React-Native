import { useEffect, useState } from 'react';
import useComments from 'hooks/useComments';
import { StyleSheet, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import SheetHeader from 'components/molecules/SheetHeader';
import CommentList from 'components/molecules/CommentList';
import SheetForm from 'components/molecules/SheetForm';

const ClipSheet = ({ fileId, sheetRef }) => {
  const [comments, setComments] = useState([]);
  const [render, reRender] = useState({});
  const { getFileComments } = useComments();

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getFileComments(fileId);
      setComments(comments);
    };
    fetchComments();
  }, [render]);

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.line} />
      <SheetHeader count={comments.length} />
      <CommentList comments={comments} reRender={reRender} />
      <SheetForm fileId={fileId} reRender={reRender} />
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
});

export default ClipSheet;
