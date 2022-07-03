import { useContext, useState, useCallback } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useFollowers: UseFollowersHook = () => {
  const [loading, setLoading] = useState(false);
  const [lastUser, setLastUser] = useState<string | undefined>();
  const { getFollowers: dbFollowers } = useContext(DatabaseContext);

  const getFollowers = useCallback(
    async (username: string, size = 10) => {
      setLoading(true);
      return dbFollowers(username, { size, lastUser })
        .then((users) => {
          if (users.length > 0) setLastUser(users[users.length - 1].username);
          return users;
        })
        .finally(() => setLoading(false));
    },
    [dbFollowers, lastUser]
  );

  return {
    getFollowers,
    loading,
  };
};
