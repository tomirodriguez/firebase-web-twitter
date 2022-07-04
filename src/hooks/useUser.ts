import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { DatabaseContext } from '../context/DatabaseContext';
import { RootState } from '../store';

export const useUser: UseUserHook = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);

  console.log({ user });

  const {
    signOut,
    isFollowing: dbIsFollowing,
    followUser,
    unfollowUser,
    postTweet,
  } = useContext(DatabaseContext);

  const isFollowing = useCallback(
    async (username: string) => {
      if (!user) throw new Error('no user');
      return dbIsFollowing({ username: user.username, following: username });
    },
    [user, dbIsFollowing]
  );

  const follow = useCallback(
    async (username: string) => {
      if (!user) throw new Error('no user');

      return followUser({ user, toFollowUsername: username });
    },
    [user, followUser]
  );

  const unfollow = useCallback(
    async (username: string) => {
      if (!user) throw new Error('no user');
      return unfollowUser({ user, toUnfollowUser: username });
    },
    [user, unfollowUser]
  );

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
    signOut,
    isFollowing,
    follow,
    unfollow,
    tweet,
  };
};
