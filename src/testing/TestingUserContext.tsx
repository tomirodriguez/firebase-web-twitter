import { FC, PropsWithChildren } from 'react';
import { UserContext } from '../context';

const defaultFirebaseFunction = async () =>
  new Promise<void>((resolve) => resolve());

export const TestingUserProvider: FC<
  PropsWithChildren & Partial<UserContextType>
> = ({
  children,
  user = null,
  loading = false,
  tweet = defaultFirebaseFunction,
  logout = defaultFirebaseFunction,
  signIn = defaultFirebaseFunction,
  setUserProfile = () => new Promise<void>((resolve) => resolve()),
}) => {
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        tweet,
        logout,
        signIn,
        setUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
