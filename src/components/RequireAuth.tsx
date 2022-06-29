import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks';
import { LoadingScreen } from './ui';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useUser();

  let location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!user || !user.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
