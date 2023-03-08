import React, { useEffect, useState } from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {useMediaByGame} from "../hooks/ApiHooks";
import Single from "./Single";

const getData = async (gameName) => {
  const media = await useMediaByGame().fetchMediaByGame(gameName);
  return media;
}

const BrowseClipList = ({navigation}) => {
  const [data, setData] = useState([]);
  const { gameName } = useRoute().params;
  console.log
  const { height, width } = Dimensions.get('window');

  useEffect(() => {
    const fetchData = async () => {
      const media = await getData(gameName);
      setData(media);
      console.log(data);
    };
    fetchData();
  }, [gameName]);


  console.log(data);
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          vertical
          data={data}
          style={{height: height, width: width}}
          snapToInterval={height}
          decelerationRate="fast"
          snapToAlignment={'center'}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Single route={{params: item}} navigation={navigation}/>
          )}
          removeClippedSubviews={true}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          windowSize={2} // Add this prop to lazy load items
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BrowseClipList;
