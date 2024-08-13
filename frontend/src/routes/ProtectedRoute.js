import { IsLoggedIn } from 'src/services/AuthService';
import { Navigate } from 'react-router-dom';
import CustomerLayout from 'src/layouts/full/CustomerLayout';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import { fetchGetAccount } from 'src/services/AccountService';

export const ProtectedRoute = ({ element }) => {
  if (!IsLoggedIn()) {
    return <Navigate to="/auth/login" />;
  }
 
  
  return element;
};

export const AuthProtectedRoute = () => {
  if (IsLoggedIn()) {
    return <Navigate to="/home" />;
  }
  return <BlankLayout />;
};
