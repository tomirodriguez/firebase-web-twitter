import { FC, PropsWithChildren, useContext } from 'react';
import { UserContext } from '../context';
import { FirebaseContext } from '../context/FirebaseContext';

const defaultFirebaseFunction = async () =>
  new Promise<void>((resolve) => resolve());

export const TestingUserProvider: FC<
  PropsWithChildren & Partial<UserContextType>
> = ({
  children,
  user = null,
  loading = false,
  tweet = defaultFirebaseFunction,
  signOut,
  signIn,
  setUserProfile,
}) => {
  const {
    signOut: fbSignOut,
    signInWithGoogle,
    setUserProfile: fbSetUserProfile,
  } = useContext(FirebaseContext);
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        tweet,
        signOut: signOut || fbSignOut,
        signIn: signIn || signInWithGoogle,
        setUserProfile: setUserProfile || fbSetUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
