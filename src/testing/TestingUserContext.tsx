import { FC, PropsWithChildren, useContext } from 'react';
import { UserContext } from '../context';
import { FirebaseContext } from '../context/FirebaseContext';
import { DUMMY_USER } from './mocks';

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
  followUser,
  unfollowUser,
}) => {
  const {
    signOut: fbSignOut,
    signInWithGoogle,
    setUserProfile: fbSetUserProfile,
    isFollowing: fbIsFollowing,
    followUser: fbFollowUser,
    unfollowUser: fbUnfollowUser,
  } = useContext(FirebaseContext);

  const fbIsFollowingFn = (username: string) =>
    fbIsFollowing(user?.username || '', username);

  const fbFollowUserFn = (username: string) =>
    fbFollowUser(user || DUMMY_USER, username);

  const fbUnfollowUserFn = (username: string) =>
    fbUnfollowUser(user || DUMMY_USER, username);

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
        followUser: followUser || fbFollowUserFn,
        unfollowUser: unfollowUser || fbUnfollowUserFn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
