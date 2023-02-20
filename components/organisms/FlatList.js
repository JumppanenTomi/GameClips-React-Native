import React from 'react';
import {FlatList as RNFlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import MediaCard from './MediaCard';

const FlatList = ({mediaArray, horizontal}) => {
  const listStyle = [!horizontal && styles.verticalList];

  return (
    <RNFlatList
      data={mediaArray}
      renderItem={({item}) => <MediaCard singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
      horizontal={horizontal}
      style={listStyle}
    />
  );
};

const styles = StyleSheet.create({
  verticalList: {
    width: '100%',
  },
});

FlatList.propTypes = {
  mediaArray: PropTypes.array.isRequired,
  horizontal: PropTypes.bool,
  navigation: PropTypes.object,
};

export default FlatList;
