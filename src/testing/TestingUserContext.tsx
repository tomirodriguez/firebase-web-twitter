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
  isFollowing,
}) => {
  const {
    signOut: fbSignOut,
    signInWithGoogle,
    setUserProfile: fbSetUserProfile,
    isFollowing: fbIsFollowing,
  } = useContext(FirebaseContext);

  const fbIsFollowingFn = (username: string) =>
    fbIsFollowing(user?.username || '', username);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        tweet,
        signOut: signOut || fbSignOut,
        signIn: signIn || signInWithGoogle,
        setUserProfile: setUserProfile || fbSetUserProfile,
        isFollowing: isFollowing || fbIsFollowingFn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
