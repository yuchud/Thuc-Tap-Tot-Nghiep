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
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Register(username, email, password, UserRoles.CUSTOMER);
      if (response) {
        console.log('Registered successfully!');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {title &&(
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

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
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
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          //component={Link} to="/auth/login"
          type="submit"
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegister;
