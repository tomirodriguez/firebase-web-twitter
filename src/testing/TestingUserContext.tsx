import { FC, PropsWithChildren, useContext, useState } from 'react';
import { UserContext } from '../context';
import { FirebaseContext } from '../context/FirebaseContext';
import { DUMMY_USER } from './mocks';

const defaultFirebaseFunction = async () =>
  new Promise<void>((resolve) => resolve());

export const TestingUserProvider: FC<
  PropsWithChildren & Partial<UserContextType>
> = ({
  children,
  user: loadedUser = DUMMY_USER,
  loading = false,
  tweet = defaultFirebaseFunction,
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

  const [user, setUser] = useState(loadedUser);

  const fbSetUserProfileFn = async (user: User) => {
    if (!user) throw new Error();

    return fbSetUserProfile(user).then(() => setUser(user));
  };

  const fbIsFollowingFn = (username: string) =>
    fbIsFollowing(user?.username || '', username);

  const fbFollowUserFn = async (username: string) => {
    if (!user) throw new Error();
    return fbFollowUser(user || DUMMY_USER, username).then(() =>
      setUser({
        ...user,
        following: user?.following + 1,
      })
    );
  };

  const fbUnfollowUserFn = async (username: string) => {
    if (!user) throw new Error();
    return fbUnfollowUser(user || DUMMY_USER, username).then(() =>
      setUser({
        ...user,
        following: user?.following - 1,
      })
    );
  };

  const signOut = async () => {
    fbSignOut().then(() => setUser(null));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        tweet,
        signOut,
        signIn: signIn || signInWithGoogle,
        setUserProfile: setUserProfile || fbSetUserProfileFn,
        isFollowing: isFollowing || fbIsFollowingFn,
        followUser: followUser || fbFollowUserFn,
        unfollowUser: unfollowUser || fbUnfollowUserFn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
