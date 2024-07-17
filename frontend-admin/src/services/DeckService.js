import { BASE_API_URL } from '../constants/api';

import http from 'http-status-codes';

export const fetchGetDecksByCourseId = async (course_id, page = 1, limit = 12) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/courses/${course_id}/decks?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      },
    );
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

export const fetchGetDeckById = async (deckId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/decks/${deckId}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchCreateDeck = async (courseData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/decks`, {
      method: 'POST',
      body: courseData,
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const fetchUpdateDeck = async (deckId, deckData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/decks/${deckId}`, {
      method: 'PUT',
      body: deckData,
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const fetchDeleteDeck = async (courseId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/decks/${courseId}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    return { error: error.message };
  }
};
