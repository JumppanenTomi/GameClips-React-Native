import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useMediaByGame } from 'hooks/ApiHooks';
import { View, Text, Video } from 'react-native';

const ClipList = () => {
  const { gameName } = useRoute().params;
  const { mediaArray } = useMediaByGame(gameName);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    setMedia(mediaArray);
  }, [mediaArray]);

  return (
    <View>
      {media && media.map(({ url, type }) => (
        <Video key={url} controls>
          <source uri={{ uri: url }} type={type} />
          <Text>Your device does not support the video tag.</Text>
        </Video>
      ))}
    </View>
  );
};

export default ClipList;
