import { BASE_API_URL } from 'src/constants/api';
import { GetCurrentAccountId } from './AuthService';

export const fetchGetDecksByCourseId = async (courseId, page = 1, limit = 12) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/courses/${courseId}/decks/public?page=${page}&limit=${limit}&account_id=${GetCurrentAccountId()}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetDeckById = async (deckId) => {
  try {
    const accountId = GetCurrentAccountId();
    const response = await fetch(`${BASE_API_URL}/decks/${deckId}?account_id=${accountId}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
