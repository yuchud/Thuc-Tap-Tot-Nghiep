import { React, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { Register } from 'src/services/AuthService';
import { useNavigate } from 'react-router-dom';
import UserRoles from 'src/constants/UserRoles';
const AuthRegister = ({ title, subtitle, subtext }) => {
  console.log('AuthRegister.js');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const isFormValid = () => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    console.log('isFormValid');
    if (!username.trim()) {
      setUsernameError('Tên đăng nhập không được để trống');
      return false;
    }

    if (username.includes('@')) {
      setUsernameError('Tên đăng nhập không được chứa ký tự @');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      setEmailError('Email không hợp lệ');
      return false;
    }

    if (!password.trim()) {
      setPasswordError('Mật khẩu không được để trống');
      return false;
    }

    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('mật khẩu xác nhận không được để trống');
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      return false;
    }
    console.log('Form is valid');
    // return false;
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log('handleRegister');
    if (!isFormValid()) {
      return;
    }

    try {
      const response = await Register(username, email, password, UserRoles.CUSTOMER);
      console.log('response:', response);
      if (!response.ok) {
        setLoginError(response.message);
        return;
      }
      console.log('Registered successfully!');
      navigate('/auth/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Tên đăng nhập
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={usernameError}
            helperText={usernameError}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Địa chỉ Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Mật khẩu
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError}
            required
          />
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="confirmPassword"
            mb="5px"
            mt="25px"
          >
            Nhập lại mật khẩu
          </Typography>
          <CustomTextField
            id="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Stack>
        {loginError && (
          <Typography color="error" variant="subtitle2">
            {loginError}
          </Typography>
        )}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          //component={Link} to="/auth/login"
          type="submit"
        >
          Đăng ký
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegister;
