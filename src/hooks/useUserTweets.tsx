import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useUserTweets: UserTweetsHook = () => {
  const { getUserTweets } = useContext(DatabaseContext);

  return {
    getUserTweets,
  };
};
