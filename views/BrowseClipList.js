import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useMediaByGame} from '../hooks/ApiHooks';
import Single from './Single';
import Ionicons from "@expo/vector-icons/Ionicons";

const getData = async (gameName) => {
  return await useMediaByGame().fetchMediaByGame(gameName);
};

const BrowseClipList = ({navigation}) => {
  const [data, setData] = useState([]);
  const {gameName} = useRoute().params;
  const {height, width} = Dimensions.get('window');

  useEffect(() => {
    const fetchData = async () => {
      const media = await getData(gameName);
      setData(media);
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
            <Single route={{params: item}} navigation={navigation} />
          )}
          removeClippedSubviews={true}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          windowSize={2} // Add this prop to lazy load items
        />
      ) : (
        <View style={{height: "80%", justifyContent: "center", alignItems: "center", paddingLeft: 24, paddingRight: 24}}>
          <Text style={{color: "#fff", fontSize: 24, marginBottom: 24}}>Gee! You found empty spot!🤬</Text>
          <Text style={{color: "#fff", fontSize: 18, marginLeft: 32, marginRight: 32}}>Help us out and upload some stuff here</Text>
          <Ionicons
            onPress={() => {
              navigation.navigate('Upload');
            }}
            style={{marginTop: 32}}
            name="add-circle-outline"
            size={60}
            color="#ffffff"
          />
        </View>
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
