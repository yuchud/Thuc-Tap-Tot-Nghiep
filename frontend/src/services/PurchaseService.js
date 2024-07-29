import { BASE_API_URL } from 'src/constants/api';
import { fetchGetAccount } from './AccountService';

export const fetchGetPurchaseHistories = async () => {
  const account = await fetchGetAccount();
  return fetch(`${BASE_API_URL}/purchase-histories/${account.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
