import { jwtDecode } from 'jwt-decode';
import UserRoles from 'src/constants/UserRoles';

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
      throw new Error('Username or password is incorrect');
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
      throw new Error('Registration failed');
    }
    return response.json();
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
