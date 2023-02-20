import {useContext, useEffect, useState} from 'react';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

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
      return await doFetch(baseUrl + 'tags', options);
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
      return await doFetch(baseUrl + 'tags/file/' + id, options);
    } catch (error) {
      throw new Error('getTagsById: ' + error.message);
    }
  };

  const getTagsByFile = async (token, id) => {
    const options = {
      method: 'get',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      return await doFetch(baseUrl + 'tags/file/' + id, options);
    } catch (error) {
      throw new Error('getTagsById: ' + error.message);
    }
  }

  return {getFilesByTag, getListTag, getTagsById, postTag};
};

export default useTag;
