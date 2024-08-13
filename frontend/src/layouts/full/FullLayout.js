import React, { useState } from 'react';
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { useMediaQuery } from '@mui/material';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

console.log('token:', localStorage.getItem('token'));
const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = (props) => {
  const [isProfile] = useState(props.isAdmin);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {props.isProfile && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      )}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}

        <Header
          isAdmin={props.isProfile}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        {/* ------------------------------------------- */}
        {/* Footer */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
            backgroundColor: 'transparent',
          }}
        >
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              width: '100%',
              textAlign: 'center',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
          >
            <Typography variant="body1">Nguyễn Đức Huy</Typography>
            <Typography variant="body2">Telephone: 098-174-9633</Typography>
            <Typography variant="body2">Email: dhuynguyen2002@gmail.com</Typography>
            <Link href="https://www.facebook.com/HuyOoO228/" target="_blank" rel="noopener">
              Facebook
            </Link>
          </Box>
        </Box>
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
