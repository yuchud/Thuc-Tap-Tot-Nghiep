import { BASE_API_URL } from 'src/constants/api';

import http from 'http-status-codes';

export const fetchGetAccounts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_API_URL}/accounts?page=${page}&limit=${limit}`, {
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

export const fetchGetAccountById = async (accountId) => {
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

export const fetchUpdateAccount = async (accountId, accountData) => {
  try {
    console.log(accountData);
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}`, {
      method: 'PUT',
      body: accountData,
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

export const fetchToggleAccountBannedStatus = async (accountId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/${accountId}/toggle-banned`, {
      method: 'PUT',
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
