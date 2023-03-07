import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {useMedia} from "../hooks/ApiHooks";
import Single from "./Single";


const ClipList = ({navigation}) => {
  const {mediaArray} = useMedia();
  const { height, width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <FlatList
        vertical
        data={mediaArray}
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

export default ClipList;

