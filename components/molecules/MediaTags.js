import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {StyleSheet, View} from 'react-native';
import {useTag} from '../../hooks/ApiHooks';
import Tag from 'components/atoms/Tag';
import {appId} from 'utils/variables';

const handleTag = (tag) => tag.replace(`${appId}_`, '');

const MediaTags = ({singleMedia}) => {
  const item = singleMedia;
  const {token} = useContext(MainContext);
  const [tags, setTags] = useState([]);
  const {getTagsById} = useTag();

  const getTagsByFile = async () => {
    const result = await getTagsById(token, item.file_id);
    const filteredTags = result.filter((item) => item.tag !== appId);
    setTags(filteredTags);
  };

  useEffect(() => {
    getTagsByFile();
  }, [item]);

  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          style={styles.tag}
          onPress={() => console.log('Pressed')}
        >
          {handleTag(tag.tag)}
        </Tag>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 18
  },
  tag: {
    marginRight: 4,
  },
});

export default MediaTags;
