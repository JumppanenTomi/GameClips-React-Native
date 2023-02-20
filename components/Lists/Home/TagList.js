import {FlatList} from 'react-native';
import {useTag} from '../../../hooks/ApiHooks';
import ListItem from '../Items/tagItem';
import PropTypes from 'prop-types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
const TagList =  ({navigation}) => {
  const [tags, setTags] = useState({});
  const getTags = async ()=>{
    try{
      const token = await AsyncStorage.getItem('userToken');
      const data = await useTag().getListTag(token);
      setTags(data);
    } catch (error){
      console.error(error)
      alert('Error fetching tag list! Please try again.');
    }
  };
  useEffect(()=>{
    getTags()
  }, []);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={tags}
      style={{paddingLeft: 24, paddingRight: 24}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};
TagList.propTypes = {
  navigation: PropTypes.object,
};
export default TagList;
