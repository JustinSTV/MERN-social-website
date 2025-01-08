import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../context/User/useUserContext';

const ProtectedRoute = () => {
  const { state } = useUserContext();
  const location = useLocation();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;