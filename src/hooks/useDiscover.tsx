import { useState, useEffect, useCallback, useContext } from 'react';
import { useUser } from './useUser';
import { DatabaseContext } from '../context/DatabaseContext';

export const useDiscover: UseDiscoverHook = (initialSearch: number) => {
  const { user } = useUser();
  const { getUsers, getFollowingsUsernames } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hiddenUsers, setHiddenUsers] = useState<User[]>([]);
  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    getFollowingsUsernames(user.username).then(setFollowingUsernames);
  }, [user, getFollowingsUsernames]);

  const getNotFollowingUsers = useCallback(
    async (size: number, lastUser?: User) => {
      if (!user) throw new Error();
      return getUsers({
        size,
        user: lastUser,
        excluse: followingUsernames,
      });
    },
    [getUsers, user, followingUsernames]
  );

  useEffect(() => {
    getNotFollowingUsers(initialSearch)
      .then((users) => {
        setHiddenUsers(users);
        setUsers(users.slice(0, initialSearch));
      })
      .finally(() => setLoading(false));
  }, [user, getNotFollowingUsers, initialSearch]);

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

  return { loading, showMore, users };
};
