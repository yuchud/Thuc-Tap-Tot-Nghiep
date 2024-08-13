import { React, useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

import { GetCurrentUserRole, Login } from 'src/services/AuthService';
import UserRoles from 'src/constants/UserRoles';
import { Navigation } from '@mui/icons-material';
const AuthLogin = ({ title, subtitle, subtext }) => {
  console.log('AuthLogin.js');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const IsFormValid = () => {
    let valid = true;
    if (username === '') {
      setUsernameError('Vui lòng nhập tên đăng nhập hoặc email');
      valid = false;
    } else {
      setUsernameError('');
    }
    if (password === '') {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (await !IsFormValid()) {
      return;
    }
    try {
      const response = await Login(username, password);
      // console.log('response:', response);
      if (!response.hasOwnProperty('token')) {
        // console.log('response.error:', response.error);
        setLoginError(response.message);
        return;
      }
      console.log('response.token:', response.token);
      const token = response.token;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={usernameError !== ''}
            helperText={usernameError}
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
          {/* <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup> */}
          <Typography
            component={Link}
            to="/auth/reset-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Quên mật khẩu?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Đăng nhập
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
