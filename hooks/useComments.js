import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from 'utils/variables';
import {useUser} from './ApiHooks';

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

const useComments = () => {
  const addComment = async (fileId, comment) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId, comment: comment}),
    };
    try {
      return await doFetch(baseUrl + 'comments', options);
    } catch (error) {
      console.log(error);
      throw new Error('addComment: ' + error.message);
    }
  };

  const removeComment = async (commentId) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'comments/' + commentId, options);
    } catch (error) {
      console.log('deleteComment: ', error);
      throw new Error('deleteComment: ' + error.message);
    }
  };

  const getFileComments = async (fileId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const json = await doFetch(baseUrl + 'comments/file/' + fileId);
      const comments = await Promise.all(
        json.map(async (comment) => {
          console.log(comment);
          const userResponse = await useUser().getUserById(
            token,
            comment.user_id
          );
          return await {...comment, user: userResponse};
        })
      );
      return comments;
    } catch (error) {
      console.log(error);
      throw new Error('getFileComments: ' + error.message);
    }
  };

  return {addComment, removeComment, getFileComments};
};

export default useComments;
