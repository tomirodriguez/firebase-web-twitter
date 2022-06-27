import { FC, PropsWithChildren, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useContext(UserContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
