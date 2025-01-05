import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../../context/User/useUserContext';

const ProtectedRoute = () => {
  const { state } = useUserContext();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;