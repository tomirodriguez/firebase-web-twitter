import { useCallback, useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import { UserContext } from '../context/UserContext';

export const useUser: UseUserHook = () => {
  const { loading, user, follow, unfollow, isFollowing, followingUsernames } =
    useContext(UserContext);

  const { signOut, postTweet } = useContext(DatabaseContext);

  const tweet = useCallback(
    async (tweet: string) => {
      if (!user) throw new Error('no user');

      return await postTweet({ username: user.username, tweet });
    },
    [postTweet, user]
  );

  return {
    user,
    loading,
    followingUsernames,
    signOut,
    follow,
    unfollow,
    tweet,
    isFollowing,
  };
};
