import { useState, useEffect, useCallback, useContext } from 'react';
import { useUser } from './useUser';
import { DatabaseContext } from '../context/DatabaseContext';

export const useDiscover: UseDiscoverHook = (initialSearch: number) => {
  const { user, followingUsernames } = useUser();
  const { getUsers } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hiddenUsers, setHiddenUsers] = useState<User[]>([]);
  const [moreLeft, setMoreLeft] = useState(true);

  const getNotFollowingUsers = useCallback(
    async (size: number, lastUser?: User) => {
      if (!user) throw new Error();

      return getUsers({
        size,
        lastUser,
        exclude: [...followingUsernames, user.username],
      }).then((newUsers) => {
        if (newUsers.length === 0) {
          setMoreLeft(false);
        }
        return newUsers;
      });
    },
    [getUsers, user, followingUsernames]
  );

  useEffect(() => {
    if (!user) return;
    getNotFollowingUsers(10)
      .then((newUsers) => {
        setHiddenUsers(newUsers);
        setUsers(newUsers.slice(0, initialSearch));
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

  return { loading, showMore, users, moreLeft };
};
