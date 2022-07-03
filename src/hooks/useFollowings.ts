import { useContext, useState, useCallback } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useFollowings: UseFollowingsHook = () => {
  const [loading, setLoading] = useState(false);
  const [lastUser, setLastUser] = useState<string | undefined>();
  const { getFollowings: dbFollowings } = useContext(DatabaseContext);

  const getFollowings = useCallback(
    async (username: string, size = 10) => {
      setLoading(true);
      return dbFollowings(username, { size, lastUser })
        .then((users) => {
          if (users.length > 0) setLastUser(users[users.length - 1].username);
          return users;
        })
        .finally(() => setLoading(false));
    },
    [dbFollowings, lastUser]
  );

  return {
    getFollowings,
    loading,
  };
};
