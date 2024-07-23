import { BASE_API_URL } from 'src/constants/api';

import http from 'http-status-codes';

export const fetchGetWordClasses = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/word-classes`, {
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
