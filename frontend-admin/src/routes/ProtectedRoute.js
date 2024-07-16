import { IsLoggedIn } from 'src/services/AuthService';
import { Navigate } from 'react-router-dom';
import FullLayout from 'src/layouts/full/FullLayout';

const ProtectedRoute = () => {
  if (!IsLoggedIn()) {
    return <Navigate to="/auth/login" />;
  }
  return <FullLayout />;
};

export default ProtectedRoute;
