import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useUser: UseUserHook = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);
  const { signOut } = useContext(DatabaseContext);

  return {
    user,
    loading,
    signOut,
    updateProfile: async () => {},
    tweet: async () => {},
  };
};
