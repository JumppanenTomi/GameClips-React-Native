import AsyncStorage from '@react-native-async-storage/async-storage';
import {gameUrl} from 'utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

export const useGame = () => {
  const gameKey = '6411c4fb4f4340ad87976cbfecd8158c';

  const getListGame = async (query) => {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let url =
        gameUrl + `games?key=${gameKey}&page=${query.page}&page_size=150`;
      if (query.search) {
        url += `&search=${query.search}`;
      }
      console.log(url);
      return await doFetch(url, options);
    } catch (error) {
      throw new Error('getListGame: ' + error.message);
    }
  };

  return {getListGame};
};
