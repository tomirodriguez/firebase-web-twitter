import { FC, PropsWithChildren, useState } from 'react';
import { FirebaseContext } from '../context';
import { FOLLOWS_DATABASE, USERS_DATABASE } from './utils/database';

export const TestingFirebaseProvider: FC<
  PropsWithChildren & Partial<FirebaseContextType>
> = ({
  children,
  signInWithGoogle = () => new Promise<void>((resolve) => resolve()),
  signOut = () => new Promise<void>((resolve) => resolve()),
  unfollowUser = () => new Promise<void>((resolve) => resolve()),
}) => {
  const [usersDatabase, setUsersDatabase] = useState(USERS_DATABASE);
  const [followsDatabase, setFollowsDatabase] = useState(FOLLOWS_DATABASE);

  const getUserProfileWithId = async (id: string) => {
    return usersDatabase.find((user) => user.id === id) || null;
  };

  const getUserProfileWithUsername = async (username: string) => {
    return usersDatabase.find((user) => user.username === username) || null;
  };

  const setUserProfile = async (user: User) => {
    const storedUser = usersDatabase.find(
      (dbUser) => dbUser.username === user.username
    );
    if (storedUser) throw new Error();
    setUsersDatabase([...usersDatabase, user]);
  };

  const isFollowing = async (username: string, isFollowing: string) => {
    const user = followsDatabase.find((dbUser) => dbUser.username === username);

    if (!user) throw new Error();

    return user.following.includes(isFollowing);
  };

  const followUser = async (user: User, toFollow: string) => {
    const newUsersDatabase = usersDatabase.map((dbUser) => {
      if (user.username === dbUser.username)
        return { ...dbUser, following: dbUser.following + 1 };
      if (toFollow === dbUser.username)
        return { ...dbUser, following: dbUser.followers + 1 };
      return dbUser;
    });

    const newFollowsDatabase = followsDatabase.map((dbUser) => {
      if (user.username === dbUser.username)
        return { ...dbUser, following: [...dbUser.following, toFollow] };
      if (toFollow === dbUser.username)
        return { ...dbUser, followers: [...dbUser.followers, user.username] };
      return dbUser;
    });

    setUsersDatabase(newUsersDatabase);
    setFollowsDatabase(newFollowsDatabase);
  };

  return (
    <FirebaseContext.Provider
      value={{
        getUserProfileWithId,
        getUserProfileWithUsername,
        setUserProfile,
        signInWithGoogle,
        signOut,
        isFollowing,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
