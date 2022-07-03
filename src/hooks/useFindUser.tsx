import { useState, useEffect, useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useFindUser = (username: string) => {
  const [userFound, setUserFound] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { getUser } = useContext(DatabaseContext);

  useEffect(() => {
    getUser({ username })
      .then(setUserFound)
      .catch(() => setUserFound(null))
      .finally(() => setLoading(false));
  }, [getUser, username]);

  return { userFound, loading };
};
