import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "utils/variables";

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

const useLikes = () => {
  const addLike = async (fileId) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_id: fileId, rating: 1 }),
    };
    try {
      return await doFetch(baseUrl + 'ratings', options);
    } catch (error) {
      console.log(error)
      throw new Error('like: ' + error.message);
    }
  }

  const removeLike = async (fileId) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId, options);
    } catch (error) {
      console.log(error)
      throw new Error('dislike: ' + error.message);
    }
  }

  const getFavourites = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'ratings', options);
    } catch (error) {
      console.log(error)
      throw new Error('getUserLikes: ' + error.message);
    }
  }

  const getFileLikes = async (fileId) => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId, options);
    } catch (error) {
      console.log(error)
      throw new Error('getFileLikeCount: ' + error.message);
    }
  }


  return { addLike, removeLike, getFavourites, getFileLikes };
}

export default useLikes;