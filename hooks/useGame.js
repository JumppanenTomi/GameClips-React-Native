import AsyncStorage from "@react-native-async-storage/async-storage";
import { gameUrl } from "utils/variables";

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

const useGame = () => {
  const gameKey = '6411c4fb4f4340ad87976cbfecd8158c';

  const getListGame = async (page, searchQuery) => {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let daniel = '';
      if (searchQuery) {
        daniel += `&search=${searchQuery}`
      }
      console.log(gameUrl + 'games' + `?page=${page}&page_size=10&key=${gameKey}` + daniel)
      return await doFetch(gameUrl + 'games' + `?page=${page}&page_size=10&key=${gameKey}` + daniel, options);
    } catch (error) {
      throw new Error('getListGame: ' + error.message);
    }
  }

  const getListGameByName = async (text) => {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(gameUrl + 'games' + `?search=${text}&key=${gameKey}`, options);
    } catch (error) {
      throw new Error('getListGameByName: ' + error.message);
    }
  }

  return { getListGame, getListGameByName }
}


export default useGame;