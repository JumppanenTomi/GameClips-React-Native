import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {useTag} from 'hooks/ApiHooks';
import {FlatList} from 'react-native';
import {TagButton} from 'components/atoms/Button';

const TagList = ({curTag, setCurTag}) => {
  const [tags, setTags] = useState([]);
  const {getListTag} = useTag();

  useEffect(() => {
    const getTags = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const data = await getListTag(token);
        setTags(data);
        setCurTag(data[0]?.tag);
      } catch (error) {
        console.error(error);
      }
    };

    getTags();
  }, []);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={tags}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <TagButton
          style={{marginRight: 8}}
          selected={curTag === item.tag}
          onPress={() => setCurTag(item.tag)}
        >
          {item.tag}
        </TagButton>
      )}
    />
  );
};
TagList.propTypes = {
  navigation: PropTypes.object,
};

export default TagList;
