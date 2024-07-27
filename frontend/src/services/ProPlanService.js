import { GetCurrentAccountId } from './AuthService';

const { BASE_API_URL } = require('../constants/api');

export const fetchGetAllProPlans = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/pro-plans`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPurchaseProPlan = async (proPlanId) => {
  try {
    const accountID = GetCurrentAccountId();
    const response = await fetch(`${BASE_API_URL}/pro-plans/${proPlanId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: accountID }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
