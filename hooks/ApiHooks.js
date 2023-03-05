import {useContext, useEffect, useState} from 'react';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [mediaUser, setMediaUser] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      const json = await useTag().getFilesByTag(appId);
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('List', 'loadMedia', error);
    }
  };

  const loadFavoriteMedia = async () => {
    try {
      const json = await useFavorites().loadFavorites();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setFavoriteArray(media);
    } catch (error) {
      console.error('List', 'loadMedia', error);
    }
  };

  const loadUserMedia = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'media/user', options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };

  useEffect(() => {
    loadMedia();
    loadFavoriteMedia();

    // load media when update state changes in main context
    // by adding update state to the array below
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload: ' + error.message);
    }
  };

  return {
    mediaArray,
    favoriteArray,
    postMedia,
    loadUserMedia,
    loadFavoriteMedia,
    mediaUser,
  };
};

const useComments = () => {
  const getCommentsById = async (id) => {
    try {
      return await doFetch(baseUrl + 'comments/file/' + id);
    } catch (error) {
      throw new Error('getCommentsById, ' + error.message);
    }
  };

  return {getCommentsById};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'login', options);
    } catch (error) {
      throw new Error('postLogin: ' + error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };

  const getUserById = async (token, id) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/' + id, options);
    } catch (error) {
      throw new Error('checkUserById: ' + error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser: ' + error.message);
    }
  };

  const putUser = async (userData, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('putUser: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  return {getUserByToken, postUser, putUser, checkUsername, getUserById};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag, ' + error.message);
    }
  };

  const postTag = async (data, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };

  const getListTag = async (token) => {
    const options = {
      method: 'get',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      // This function fetches the data from the API and filters it, returning only the tags that don't have the AppID, an empty string or undefined.
      const jsonData = await doFetch(baseUrl + 'tags', options);
      const noAppID = jsonData
        .filter((item) => item.tag.startsWith(appId))
        .map((item) => ({
          ...item,
          tag: item.tag.substring(appId.length + 1),
        }));
      const noEmt = noAppID.filter(({tag}) => tag !== '');
      const noUndefined = noEmt.filter(({tag}) => tag !== 'undefined');
      const uniqueData = {};
      noUndefined.forEach(obj => {
        if (!uniqueData[obj.tag]) {
          uniqueData[obj.tag] = obj;
        }
      });
      return Object.values(uniqueData);
    } catch (error) {
      throw new Error('getListTag: ' + error.message);
    }
  };

  const getTagsById = async (token, id) => {
    const options = {
      method: 'get',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const jsonData = await doFetch(baseUrl + 'tags/file/' + id, options);

      const noAppID = jsonData
        .filter((item) => item.tag.startsWith(appId))
        .map((item) => ({
          ...item,
          tag: item.tag.substring(appId.length + 1),
        }));
      const noEmt = noAppID.filter(({tag}) => tag !== '');
      const noUndefined = noEmt.filter(({tag}) => tag !== 'undefined');
      if (noUndefined.length > 0) {
        return noUndefined;
      }else{
        return [{tag_id: 1, file_id: id, tag: 'No tags'}];
      }
    } catch (error) {
      throw new Error('getTagsById: ' + error.message);
    }
  };

  return {getFilesByTag, getListTag, getTagsById, postTag};
};

const useFavorites = () => {
  const deleteFavorite = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + id, options);
    } catch (error) {
      throw new Error('deleteFavorite: ' + error.message);
    }
  };
  const addFavorite = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: id}),
    };
    try {
      console.log(options);
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      console.log(error);
      throw new Error('favorite: ' + error.message);
    }
  };

  const loadFavorites = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('favoriteList: ' + error.message);
    }
  };

  return {deleteFavorite, addFavorite, loadFavorites};
};

export {
  useMedia,
  useAuthentication,
  useUser,
  useTag,
  useComments,
  useFavorites,
};
