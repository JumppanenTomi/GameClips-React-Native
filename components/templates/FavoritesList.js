import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useMedia} from 'hooks/ApiHooks';
import FavoriteCard from 'components/organisms/FavoriteCard';

const FavoritesList = ({navigation}) => {
  const {favoriteArray} = useMedia();
  const [data, setData] = useState(favoriteArray);

  useEffect(() => {
    setData(favoriteArray);
  }, [favoriteArray]);

  return (
    <>
      {favoriteArray.length > 0 ? (
        <FlatList
          data={favoriteArray}
          keyExtractor={(item, index) => index.toString()}
          style={{paddingHorizontal: 24}}
          renderItem={({item}) => (
            <FavoriteCard navigation={navigation} singleMedia={item} />
          )}
        />
      ) : (
        <View
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <Text style={{color: '#fff', fontSize: 24}}>
            It looks pretty empty here🤬
          </Text>
          <Text style={{color: '#fff', fontSize: 16, marginTop: 32}}>
            When you find a clip you want to access later, click the clip's
            share button, and select the "add to favorites" option
          </Text>
        </View>
      )}
    </>
  );
};

FavoritesList.propTypes = {
  navigation: PropTypes.object,
};

export default FavoritesList;
