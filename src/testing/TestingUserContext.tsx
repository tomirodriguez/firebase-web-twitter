import { FC, PropsWithChildren } from 'react';
import { UserContext } from '../context/UserContext';

const defaultFirebaseFunction = () => new Promise<void>((resolve) => resolve());

export const TestingUserProvider: FC<
  PropsWithChildren & Partial<UserContextType>
> = ({
  children,
  user = null,
  loading = false,
  tweet = defaultFirebaseFunction,
  logout = defaultFirebaseFunction,
  signIn = defaultFirebaseFunction,
  setUserProfile = defaultFirebaseFunction,
}) => {
  return (
    <UserContext.Provider
      value={{ user, loading, tweet, logout, signIn, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
