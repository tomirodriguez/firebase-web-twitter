import { FC, PropsWithChildren, useCallback, useState, useEffect } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import { EMPTY_PROFILE_USER } from './mocks/users';

type InitialState = {
  user?: User | null;
  usersDatabaseInitialState: User[];
  followsDatabaseInitialState: Follow[];
  timelineDatabaseInitialState: Tweet[];
};

export const DatabaseTestContext: FC<
  PropsWithChildren & InitialState & Partial<DatabaseContext>
> = ({
  children,
  user: initialUser = null,
  usersDatabaseInitialState: udb,
  followsDatabaseInitialState: fdb,
  timelineDatabaseInitialState: tdb,
}) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [usersDatabase, setUsersDatabase] = useState(
    new Map<string, User>(udb.map((user) => [user.username, user]))
  );
  const [followsDatabase, setFollowsDatabase] = useState(fdb);
  const [timelineDatabase, setTimelineDatabase] = useState(tdb);
  const [observer, setObserver] = useState<() => void>(() => {});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (observer && loaded) {
      observer();
    }
  }, [observer, currentUser, loaded]);

  const userLoginObserver = (observerReceived: UserLoginObserver) => {
    setObserver(() => {
      observerReceived(currentUser);
    });

    return () => setObserver(() => {});
  };

  const signInWithGoogle = async () => {
    setCurrentUser(EMPTY_PROFILE_USER);
  };

  const addUser: AddUser = async (user: User) => {
    usersDatabase.set(user.username, user);
    // setUser(user);
  };

  const getUser: GetUser = async ({ username = '' }) => {
    const userFound = usersDatabase.get(username);

    if (!userFound) throw new Error();

    return userFound;
  };

  const signOut: SignOut = async () => {
    setCurrentUser(null);
  };

  const isFollowing: IsFollowing = async ({ username, following }) => {
    const userFollowing = followsDatabase.find((follow) => {
      const { followUsername: userFollowed, username: userFollowing } = follow;
      if (userFollowed === following && userFollowing === username) return true;
      return false;
    });

    return userFollowing !== undefined;
  };

  const followUser: FollowUser = async ({ user, toFollowUsername }) => {
    // const isAlreadyFollowing = await isFollowing({
    //   username: user.username,
    //   following: toFollowUsername,
    // });

    // if (isAlreadyFollowing) return;

    const newUsersDatabase = new Map(usersDatabase);

    const userFollower = newUsersDatabase.get(user.username);
    const userFollowing = newUsersDatabase.get(toFollowUsername);

    if (!userFollower || !userFollowing) throw new Error();

    newUsersDatabase.set(user.username, {
      ...userFollower,
      following: userFollower.following + 1,
    });
    newUsersDatabase.set(toFollowUsername, {
      ...userFollowing,
      followers: userFollowing.followers + 1,
    });

    const newFollowsDatabase: Follow[] = [
      ...followsDatabase,
      {
        id: user.username + toFollowUsername,
        followUsername: toFollowUsername,
        username: user.username,
        timestamp: new Date(),
      },
    ];

    setUsersDatabase(newUsersDatabase);
    setFollowsDatabase(newFollowsDatabase);
  };

  const unfollowUser: UnfollowUser = async ({ user, toUnfollowUser }) => {
    const isAlreadyFollowing = await isFollowing({
      username: user.username,
      following: toUnfollowUser,
    });

    if (!isAlreadyFollowing) return;

    const newUsersDatabase = new Map(usersDatabase);

    const userFollower = newUsersDatabase.get(user.username);
    const userFollowing = newUsersDatabase.get(toUnfollowUser);

    if (!userFollower || !userFollowing) throw new Error();

    newUsersDatabase.set(user.username, {
      ...userFollower,
      following: userFollower.following - 1,
    });
    newUsersDatabase.set(toUnfollowUser, {
      ...userFollowing,
      followers: userFollowing.followers - 1,
    });

    const newFollowsDatabase: Follow[] = followsDatabase.filter((follow) => {
      return (
        follow.username !== user.username ||
        follow.followUsername !== toUnfollowUser
      );
    });

    // setUsersDatabase(newUsersDatabase);
    setFollowsDatabase(newFollowsDatabase);

    console.log({ newFollowsDatabase });
  };

  const getUserProfileWithId = async (id: string) => {
    // return usersDatabase.find((user) => user.id === id) || null;
  };

  const getUserProfileWithUsername = async (username: string) => {
    // return usersDatabase.find((user) => user.username === username) || null;
  };

  const setUserProfile = async (user: User) => {
    // const storedUser = usersDatabase.find(
    //   (dbUser) => dbUser.username === user.username
    // );
    // if (storedUser) throw new Error();
    // setUsersDatabase([...usersDatabase, user]);
  };

  const postTweet = async () => {};

  const getUserTweets = async (username: string) => {
    return [];
    // return timelineDatabase.filter((tweet) => tweet.username === username);
  };

  const getTweets = async () => {
    //   const userFriends = followsDatabase.find(
    //     (data) => data.username === user.username
    //   );

    //   if (!userFriends) throw new Error();

    //   const usersToSearch = [userFriends, user.username];
    //   return timelineDatabase.filter((tweet) =>
    //     usersToSearch.includes(tweet.username)
    //   );
    return [];
  };

  const onHomeFeedChange: OnHomeFeedChange = () => {
    return [];
  };

  const getNewFollowers = async () => {
    return [];
  };

  const getFollowings = async () => {
    return [];
  };

  const getFollowers = async () => {
    return [];
  };

  const getUsers = async () => {
    return [];
  };

  const getFollowingsUsernames = useCallback(
    async (username: string) => {
      const filteredRelations = followsDatabase.filter(
        (relation) => relation.username === username
      );

      return filteredRelations.map((relation) => relation.username);
    },
    [followsDatabase]
  );

  const onNewFollowing = () => {};
  const onFollowerGain = () => {};

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        signInWithGoogle,
        addUser,
        getUser,
        signOut,
        isFollowing,
        followUser,
        unfollowUser,
        userLoginObserver,
        postTweet,
        getUserTweets,
        onHomeFeedChange,
        getUsers,
        getFollowings,
        getFollowers,
        getTweets,
        getFollowingsUsernames,
        onNewFollowing,
        onFollowerGain,
      }}
    >
      {loaded ? children : null}
    </DatabaseContext.Provider>
  );
};
