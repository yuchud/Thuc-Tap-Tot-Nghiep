import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Login } from '../../../services/AuthService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameOrEmailError, setUsernameOrEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  // console.log('AuthLogin.js');

  const IsFormValid = () => {
    if (usernameOrEmail === '') {
      setUsernameOrEmailError('Vui lòng nhập tên đăng nhập hoặc email');
      return false;
    }
    if (password === '') {
      setPasswordError('Vui lòng nhập mật khẩu');
      return false;
    }
    return true;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!IsFormValid()) {
      return;
    }
    try {
      setLoginError('');
      const response = await Login(usernameOrEmail, password);
      // console.log(usernameOrEmail, password);
      // console.log(response);
      if (!response.hasOwnProperty('token')) {
        // console.log(response);
        // console.log('Login successful');
        setLoginError(response.error);
        return;
      }
      // console.log(2);
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Tên đăng nhập / Email
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            error={usernameOrEmailError !== ''}
            helperText={usernameOrEmailError}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
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
            required
            error={passwordError !== ''}
            helperText={passwordError}
          />
        </Box>
        {loginError && (
          <Typography color="error" variant="body2" mb={2}>
            {loginError}
          </Typography>
        )}
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          {/* <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography> */}
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          //component={Link}
          //to="/"
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
