import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import Single from './Single';

const height = Dimensions.get('window').height + 50;

const ClipList = ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={mediaArray}
        snapToInterval={height}
        decelerationRate="fast"
        snapToAlignment="center"
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Single
            route={{params: item}}
            navigation={navigation}
            height={height}
          />
        )}
        removeClippedSubviews={true}
        initialNumToRender={1}
        maxToRenderPerBatch={3}
        windowSize={2} // Add this prop to lazy load items
      />
    </View>
  );
};

export default ClipList;
