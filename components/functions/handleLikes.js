
import AsyncStorage from "@react-native-async-storage/async-storage";
import {baseUrl} from "../../utils/variables";

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

const handleLikes = () => {
  const like = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: id, rating: 1}),
    };
    try {
      return await doFetch(baseUrl + 'ratings', options);
    } catch (error) {
      console.log(error)
      throw new Error('like: ' + error.message);
    }
  }
  const dislike = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'ratings/file/'+id, options);
    } catch (error) {
      console.log(error)
      throw new Error('dislike: ' + error.message);
    }
  }
  const getUserLikes = async () => {
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
  const countFileLikes = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'ratings/file/'+id, options);
    } catch (error) {
      console.log(error)
      throw new Error('countFileLikes: ' + error.message);
    }
  }


  return {like, dislike, getUserLikes, countFileLikes};
};
export default handleLikes;
