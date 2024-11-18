import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';

import LoginRightGroupHeader from './LoginRightGroupHeader';
import Logo from '../shared/logo/Logo';
import RightGroupHeader from './RightGroupHeader';
const Header = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isLogin = localStorage.getItem('token') !== null;
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderLeft: 'none',
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));
  const HeaderButton = styled(Button)(({ theme }) => ({
    fontSize: '1.12rem',
    padding: '10px 20px',
    ':hover': {
      background: '#f4f4f4',
      color: 'primary.main',
    },
  }));
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box px={3}>
          <Logo />
        </Box>
        <Stack spacing={1} direction="row" alignItems="center">
          <HeaderButton color="primary" href="/home" sx={{ fontWeight: 800 }}>
            Trang chủ
          </HeaderButton>
          <HeaderButton color="primary" href="/courses" sx={{ fontWeight: 800 }}>
            Khóa Học
          </HeaderButton>
          {/* <HeaderButton color="primary" href="/about" sx={{ fontWeight: 800 }}>
            Giới thiệu
          </HeaderButton> */}
          {/* <HeaderButton color="primary" href="/contact" sx={{ fontWeight: 800 }}>
            Liên hệ
          </HeaderButton> */}
          <HeaderButton color="primary" href="/pro-plans" sx={{ fontWeight: 800 }}>
            Gói Pro
          </HeaderButton>
        </Stack>
        <Box flexGrow={1} />
        {!isLogin && <RightGroupHeader />}
        {isLogin && <LoginRightGroupHeader />}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
