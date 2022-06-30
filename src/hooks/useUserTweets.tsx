import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';

export const useUserTweets: UserTweetsHook = () => {
  const { getUserTweets } = useContext(FirebaseContext);

  return {
    getUserTweets,
  };
};
