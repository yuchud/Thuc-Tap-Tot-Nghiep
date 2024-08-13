import { BASE_API_URL } from '../constants/api';

export const Login = async (usernameOrEmail, password) => {
  try {
    const response = await fetch(`${BASE_API_URL}/accounts/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    // console.log(response);
    if (!response.ok) {
      return { error: 'Tên đăng nhập / Email hoặc mật khẩu không đúng' };
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

// export const Register = async (username, email, password, account_role_id) => {
//   try {
//     console.log({ username, email, password, account_role_id})
//     const response = await fetch(`${BASE_URL}/accounts/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, email, password, account_role_id}),
//     });
//     if (!response.ok) {
//       throw new Error('Registration failed');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

export const IsLoggedIn = () => {
  // console.log(localStorage.getItem('token'));
  return localStorage.getItem('token') !== null;
};
