import { useCallback, useContext, useEffect, useState } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import { useUser } from './useUser';

export const useDiscover: UseDiscoverHook = (initialSearch: number) => {
  const { user } = useUser();
  const { getUsers, getFollowingsUsernames } = useContext(DatabaseContext);
  const [followingsLoaded, setFollowingsLoaded] = useState(false);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hiddenUsers, setHiddenUsers] = useState<User[]>([]);

  const [moreLeft, setMoreLeft] = useState(true);

  useEffect(() => {
    if (!user) return;

    getFollowingsUsernames(user.username)
      .then(setFollowing)
      .finally(() => setFollowingsLoaded(true));
  }, [getFollowingsUsernames, user]);

  const getNotFollowingUsers = useCallback(
    async (size: number, lastUser?: User) => {
      if (!user) throw new Error();

      return getUsers({
        size,
        lastUser,
        exclude: [...following, user.username],
      }).then((newUsers) => {
        if (newUsers.length === 0) {
          setMoreLeft(false);
        }

        return newUsers;
      });
    },
    [getUsers, user, following]
  );

  useEffect(() => {
    if (!user || !followingsLoaded) return;
    getNotFollowingUsers(10)
      .then((users) => {
        setHiddenUsers(users);
        setUsers(users.slice(0, initialSearch));
      })
      .finally(() => setLoading(false));
  }, [user, getNotFollowingUsers, initialSearch, followingsLoaded]);

  const showMore = useCallback(async () => {
    const SHOW_MORE_SIZE = 10;
    if (hiddenUsers.length >= users.length + SHOW_MORE_SIZE) {
      setUsers(hiddenUsers.slice(0, users.length + SHOW_MORE_SIZE));
      return;
    }
    const lastUser = hiddenUsers[hiddenUsers.length - 1];
    getNotFollowingUsers(SHOW_MORE_SIZE, lastUser).then((moreTweets) => {
      const joinFeed = [...hiddenUsers, ...moreTweets];
      setHiddenUsers(joinFeed);
      setUsers(joinFeed.slice(0, users.length + SHOW_MORE_SIZE));
    });
  }, [getNotFollowingUsers, users, hiddenUsers]);

  return { loading, showMore, users, moreLeft };
};
