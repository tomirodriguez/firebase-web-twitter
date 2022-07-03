import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { DatabaseContext } from '../context/DatabaseContext';
import { RootState } from '../store';

export const useUser: UseUserHook = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);

  const {
    signOut,
    isFollowing: dbIsFollowing,
    followUser,
    unfollowUser,
    getTweets,
    getNotFollowingPeople,
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

  const getFeedBeforeDate: GetFeedBeforeDate = useCallback(
    async (options = {}) => {
      if (!user) throw new Error('no user');

      return [];

      // const { size = 20, date: timestamp = new Date() } = options;

      // const following = await getFollowingUsernames(user.username);

      // const tweets = await getTweets([...following, user.username], {
      //   size,
      //   date: timestamp,
      // });

      // console.log({ tweets });
      // return tweets;
    },
    []
  );

  const discoverPeople: DiscoverPeople = useCallback(
    async (size = 2) => {
      if (!user) throw new Error('no user');
      return getNotFollowingPeople(user?.username);
    },
    [user, getNotFollowingPeople]
  );

  return {
    user,
    loading,
    signOut,
    isFollowing,
    follow,
    unfollow,
    getFeedBeforeDate,
    discoverPeople,
  };
};
