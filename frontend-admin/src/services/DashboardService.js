import { BASE_API_URL } from 'src/constants/api';
import { GetCurrentYear, GetCurrentMonth } from 'src/utilities/Date';
export const fetchGetRevenueInYear = async (year) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/revenue-in-year/${year}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetRevenueInMonth = async (year, month) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/revenue-in-month/${year}/${month}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetDailyRevenueInMonth = async (year, month) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/dashboard/revenue-daily-in-month/${year}/${month}`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetTopProPlansInMonth = async (year, month) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/dashboard/top-pro-plans-in-month/${year}/${month}`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetTopProPlansInYear = async (year) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/top-pro-plans-in-year/${year}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetProPlansInYear = async (year) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/pro-plans-in-year/${year}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetCreatedAccountsInMonth = async (year, month) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/dashboard/created-accounts-in-month/${year}/${month}`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetCreatedAccountsInYear = async (year) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dashboard/created-accounts-in-year/${year}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchGetCreatedAccountsDailyInMonth = async (year, month) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/dashboard/created-accounts-daily-in-month/${year}/${month}`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
