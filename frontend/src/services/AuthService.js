import { jwtDecode } from 'jwt-decode';
import UserRoles from 'src/constants/UserRoles';
import http from 'http-status-codes';
const BASE_URL = 'http://localhost:3000/api';

export const Login = async (usernameOrEmail, password) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (!response.ok) {
      // console.log('response:', response);
      const errorData = await response.json();
      return errorData;
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const Register = async (username, email, password, account_role_id) => {
  try {
    console.log({ username, email, password, account_role_id });
    const response = await fetch(`${BASE_URL}/accounts/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, account_role_id }),
    });

    if (!response.ok) {
      // console.log('response:', response);
      const errorData = await response.json();
      return errorData;
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const GetCurrentUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const GetCurrentAccountId = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const IsAccountBanned = async (accountId) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    console.log(data);
    return data.is_banned;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const IsLoggedIn = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const resetPasswordWithOTP = async (email, otp, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, new_password: newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
