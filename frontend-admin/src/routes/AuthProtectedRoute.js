import { IsLoggedIn } from '../services/AuthService';
import { Navigate } from 'react-router-dom';

const AuthProtectedRoute = ({ element }) => {
  if (IsLoggedIn()) {
    return <Navigate to="/" />;
  }
  return element;
};

export default AuthProtectedRoute;
