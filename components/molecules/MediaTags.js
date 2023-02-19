import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {StyleSheet, View} from 'react-native';
import {useTag} from '../../hooks/ApiHooks';

const MediaTags = ({singleMedia, navigation}) => {
  const item = singleMedia;
  const {token} = useContext(MainContext);
  const [tags, setTags] = useState([]);
  const {getTagsById} = useTag();

  const getTagsByFile = async () => {
    const result = await getTagsById(token, item.id);
    setTags(result);
  };

  useEffect(() => {
    getTagsByFile();
  }, []);

  console.log(tags);

  return (
    <View style={styles.cardTags}>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          style={styles.tag}
          onPress={() => console.log('Pressed')}
        >
          {tag.tag}
        </Tag>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
});

export default MediaTags;
