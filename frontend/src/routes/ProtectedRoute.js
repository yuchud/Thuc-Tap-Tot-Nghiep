import { IsLoggedIn } from 'src/services/AuthService';
import { Navigate } from 'react-router-dom';
import CustomerLayout from 'src/layouts/full/CustomerLayout';
import BlankLayout from 'src/layouts/blank/BlankLayout';

export const ProtectedRoute = () => {
  if (!IsLoggedIn()) {
    return <Navigate to="/auth/login" />;
  }
  return <CustomerLayout />;
};

export const AuthProtectedRoute = () => {
  if (IsLoggedIn()) {
    return <Navigate to="/home" />;
  }
  return <BlankLayout />;
};
