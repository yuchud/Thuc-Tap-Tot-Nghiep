import { BASE_API_URL } from 'src/constants/api';

export const fetchGetDecksByCourseId = async (courseId, page = 1, limit = 12) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/courses/${courseId}/decks/public?page=${page}&limit=${limit}`,
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
    const response = await fetch(`${BASE_API_URL}/decks/${deckId}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
