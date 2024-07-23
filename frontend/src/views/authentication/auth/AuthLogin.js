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
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Login(username, password);
      const token = response.token;
      localStorage.setItem('token', token);
      navigate('/');
      //<Navigation to="/dashboard" />;
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
            Username
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          // to="/"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
