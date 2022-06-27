import { FC, PropsWithChildren } from 'react';
import { UserContext } from '../context/UserContext';

const defaultFirebaseFunction = () =>
  new Promise<{}>((resolve) => resolve({ success: true, errorKey: '' }));

export const TestingUserProvider: FC<
  PropsWithChildren & Partial<UserContextType>
> = ({
  children,
  user = null,
  loading = false,
  tweet = defaultFirebaseFunction,
  logout = defaultFirebaseFunction,
}) => {
  return (
    <UserContext.Provider value={{ user, loading, tweet, logout }}>
      {children}
    </UserContext.Provider>
  );
};
