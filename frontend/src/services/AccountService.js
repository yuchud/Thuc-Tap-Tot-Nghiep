import { BASE_API_URL } from '../constants/api';
import http from 'http-status-codes';

import { GetCurrentAccountId } from './AuthService';
export const accountService = async (usernameOrEmail, password) => {
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    if (!response.ok) {
      throw new Error('Username or password is incorrect');
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchGetAccount = async () => {
  const accountId = GetCurrentAccountId();
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}`, {
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

export const fetchUpdateAccount = async (accountData) => {
  try {
    const accountId = GetCurrentAccountId();
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}`, {
      method: 'PUT',
      body: accountData,
    });

    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        return { error: errorData.message };
      }
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchUpdatePassword = async (passwordData) => {
  try {
    const accountId = GetCurrentAccountId();
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: passwordData.get('password') }),
    });

    if (!response.ok) {
      // if (response.status === http.BAD_REQUEST) {
      // const errorData = await response.json();
      // throw new Error(errorData.message);
      // }
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchGetAccountAvatar = async () => {
  const accountId = GetCurrentAccountId();
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    console.log(response.json);
    return response.json().avatar_url;
  } catch (error) {
    return error;
  }
};

export const fetchGetLearnStreak = async () => {
  const accountId = GetCurrentAccountId();
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}/learn-streak`, {
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

export const fetchGetWeeklyLearnTracker = async () => {
  const accountId = GetCurrentAccountId();
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}/weekly-learn-tracker`, {
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

export const fetchGetLearnedCardsCount = async () => {
  const accountId = GetCurrentAccountId();
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}/learned-cards-count`, {
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
