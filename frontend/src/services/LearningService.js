import { BASE_API_URL } from 'src/constants/api';
import { GetCurrentAccountId } from './AuthService';

export const fetchGetCardsToLearnByDeckId = async (deckId) => {
  try {
    const accountID = GetCurrentAccountId();
    const response = await fetch(
      `${BASE_API_URL}/learning/deck?deck_id=${deckId}&account_id=${accountID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchFinishLearning = async (learnedCards) => {
  try {
    const accountID = GetCurrentAccountId();
    console.log(learnedCards);
    const response = await fetch(`${BASE_API_URL}/learning/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_id: accountID,
        learned_cards: learnedCards,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
