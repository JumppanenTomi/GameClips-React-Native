
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

const handleComment = () => {
  const postComment = async (postId, comment) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: postId, comment: comment}),
    };
    try {
      return await doFetch(baseUrl + 'comments', options);
    } catch (error) {
      console.log(error)
      throw new Error('postComment: ' + error.message);
    }
  }
  const deleteComment = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    };
    try {
      return await doFetch(baseUrl + 'comments/'+id, options);
    } catch (error) {
      console.log('deleteComment: ',error)
      throw new Error('deleteComment: ' + error.message);
    }
  }
  return {postComment, deleteComment};
};
export default handleComment;
