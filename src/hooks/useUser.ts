import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  return context;
};
