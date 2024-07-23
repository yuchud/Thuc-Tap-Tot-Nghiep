import { BASE_API_URL } from 'src/constants/api';

import http from 'http-status-codes';

export const fetchGetCardsByDeckId = async (deck_id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/decks/${deck_id}/cards`, {
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

export const fetchCreateCard = async (cardData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/cards`, {
      method: 'POST',
      body: cardData,
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

export const fetchUpdateCard = async (cardId, cardData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/cards/${cardId}`, {
      method: 'PUT',
      body: cardData,
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

export const fetchDeleteCard = async (cardId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/cards/${cardId}`, {
      method: 'DELETE',
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
