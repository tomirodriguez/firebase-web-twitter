import { useCallback, useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useFindUser = () => {
  const { getUser } = useContext(DatabaseContext);

  const findUser = useCallback(
    async (username: string) => {
      return getUser({ username });
    },
    [getUser]
  );

  return { findUser };
};
