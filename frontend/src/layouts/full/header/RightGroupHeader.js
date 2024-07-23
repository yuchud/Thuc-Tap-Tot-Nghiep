import React from 'react';

import { Stack, Button, IconButton, Badge } from '@mui/material';
import Profile from './Profile';

import { IconBellRinging } from '@tabler/icons';
const RightGroupHeader = () => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        //target="_blank"
        href="/auth/login"
      >
        Đăng nhập
      </Button>
      <Button
        variant="outlined"
        color="primary"
        //target="_blank"
        href="/auth/register"
      >
        Đăng ký
      </Button>
      
    </Stack>
  );
};

export default RightGroupHeader;
