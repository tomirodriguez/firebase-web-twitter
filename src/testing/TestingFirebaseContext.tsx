import { FC, PropsWithChildren, useState } from 'react';
import { FirebaseContext } from '../context';
import { FOLLOWS_DATABASE, USERS_DATABASE } from './mocks/database';

type InitialState = {
  usersDatabaseInitialState?: User[];
  followsDatabaseInitialState?: FirestoreFollows[];
};

export const TestingFirebaseProvider: FC<PropsWithChildren & InitialState> = ({
  children,
  usersDatabaseInitialState = USERS_DATABASE,
  followsDatabaseInitialState = FOLLOWS_DATABASE,
}) => {
  const [usersDatabase, setUsersDatabase] = useState(usersDatabaseInitialState);
  const [followsDatabase, setFollowsDatabase] = useState(
    followsDatabaseInitialState
  );
  const [timelineDatabase, setTimelineDatabase] = useState<Tweet[]>([]);

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

  const unfollowUser = async (user: User, toFollow: string) => {
    const newUsersDatabase = usersDatabase.map((dbUser) => {
      if (user.username === dbUser.username)
        return { ...dbUser, following: dbUser.following - 1 };
      if (toFollow === dbUser.username)
        return { ...dbUser, following: dbUser.followers - 1 };
      return dbUser;
    });

    const newFollowsDatabase = followsDatabase.map((dbUser) => {
      if (user.username === dbUser.username)
        return {
          ...dbUser,
          following: dbUser.following.filter((follow) => follow !== toFollow),
        };
      if (toFollow === dbUser.username)
        return {
          ...dbUser,
          followers: dbUser.followers.filter(
            (follow) => follow !== user.username
          ),
        };
      return dbUser;
    });

    setUsersDatabase(newUsersDatabase);
    setFollowsDatabase(newFollowsDatabase);
  };

  const postTweet = async () => {};

  const getUserTweets = async (username: string) => {
    return timelineDatabase.filter((tweet) => tweet.username === username);
  };

  const getHomeFeed = async (user: User) => {
    const userFriends = followsDatabase.find(
      (data) => data.username === user.username
    );

    if (!userFriends) throw new Error();

    const usersToSearch = [userFriends, user.username];
    return timelineDatabase.filter((tweet) =>
      usersToSearch.includes(tweet.username)
    );
  };

  const onHomeFeedChange = async () => {
    return [];
  };

  const getFollowingUsers = async () => {
    return [];
  };

  return (
    <FirebaseContext.Provider
      value={{
        getUserProfileWithId,
        getUserProfileWithUsername,
        setUserProfile,
        signInWithGoogle: () => new Promise<void>((resolve) => resolve()),
        signOut: () => new Promise<void>((resolve) => resolve()),
        isFollowing,
        followUser,
        unfollowUser,
        postTweet,
        getUserTweets,
        getHomeFeed,
        onHomeFeedChange,
        getFollowingUsers,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
