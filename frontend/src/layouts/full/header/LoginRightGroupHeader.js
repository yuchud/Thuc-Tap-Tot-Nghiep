import React from 'react';
import { Stack, Button, IconButton, Badge } from '@mui/material';
import Profile from './Profile';
import { IconBellRinging } from '@tabler/icons';
import Streak from '../../../components/Streak';
const LoginRightGroupHeader = () => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {/* <Button variant="contained" color="primary" href="/pro-plans">
        Upgrade to Pro
      </Button> */}
      <Streak />
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        href="/notifications"
      >
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      <Profile />
    </Stack>
  );
};

export default LoginRightGroupHeader;
