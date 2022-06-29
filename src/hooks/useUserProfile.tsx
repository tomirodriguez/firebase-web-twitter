import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';

export const useUserProfile: UserProfileHook = (
  options = { type: 'USERNAME' }
) => {
  const { getUserProfileWithUsername } = useContext(FirebaseContext);

  return {
    getUserProfile: getUserProfileWithUsername,
  };
};
