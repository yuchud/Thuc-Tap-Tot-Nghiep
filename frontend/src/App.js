import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from './theme/DefaultColors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { GetCurrentAccountId } from './services/AuthService';
import { IsAccountBanned } from './services/AuthService';

const socket = io('http://localhost:3000');
function App() {
  const navigate = useNavigate();
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  const handleCheckAccountBanned = async () => {
    const currentAccountId = GetCurrentAccountId();
    if (currentAccountId && (await IsAccountBanned(currentAccountId))) {
      localStorage.removeItem('token');
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('message', (message) => {
      console.log(message);
    });

    socket.on('account_banned_status_changed', (data) => {
      console.log('Account banned status changed', data);
      const currentAccountId = GetCurrentAccountId();
      if (currentAccountId === data.account_id) {
        // Clear token and log out
        localStorage.removeItem('token');
        navigate('/auth/login');
      }
    });

    // Handle tab close
    window.addEventListener('beforeunload', () => {
      socket.disconnect();
    });

    handleCheckAccountBanned();

    return () => {
      socket.off('account_banned_status_changed');
      window.removeEventListener('beforeunload', () => {
        socket.disconnect();
      });
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
