import { BASE_API_URL } from 'src/constants/api';

export const fetchTopCurrentLearnStreaks = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/top-current-learn-streaks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopLongestLearnStreaks = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/top-longest-learn-streaks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopLearnedCardsCount = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/top-learned-cards-count`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
