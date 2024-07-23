import { BASE_API_URL } from 'src/constants/api';

export const fetchGetCardsByDeckId = async (deckId, page = 1, limit = 12) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/decks/${deckId}/cards/public?page=${page}&limit=${limit}`,
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

