import { useContext } from 'react';
import { FirebaseContext } from '../context';

export const useHomeFeed: HomeFeedHook = () => {
  const { getHomeFeed } = useContext(FirebaseContext);
  return { getFeed: (user: User) => getHomeFeed(user) };
};
