import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  let location = useLocation();

  if (!user || !user.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
