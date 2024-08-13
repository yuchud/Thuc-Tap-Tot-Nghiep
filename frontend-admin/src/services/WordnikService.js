import { BASE_API_URL } from '../constants/api';
import http from 'http-status-codes';

export const fetchGetAudios = async (word) => {
  try {
    const response = await fetch(`${BASE_API_URL}/wordnik/audios/${word}`, {
      method: 'GET',
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGetPronunciations = async (word) => {
  try {
    word = word.toLowerCase();
    const response = await fetch(`${BASE_API_URL}/wordnik/pronunciations/${word}`, {
      method: 'GET',
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGetAudioById = async (word, id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/wordnik/audios/${word}/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    return error;
  }
};
