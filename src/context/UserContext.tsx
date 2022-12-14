import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DatabaseContext } from './DatabaseContext';

const NOT_IMPLEMENTED_FUNCTION = async () => {
  throw new Error('To implement');
};

const defaultUserContext: UserContext = {
  user: null,
  loading: true,
  followingUsernames: [],
  followingUsers: new Map(),
  createUserProfile: NOT_IMPLEMENTED_FUNCTION,
  follow: NOT_IMPLEMENTED_FUNCTION,
  unfollow: NOT_IMPLEMENTED_FUNCTION,
  isFollowing: NOT_IMPLEMENTED_FUNCTION,
};

export const UserContext = createContext<UserContext>(defaultUserContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contextLoading, setContextLoading] = useState(true);
  const {
    getFollowingsUsernames,
    addUser,
    followUser,
    unfollowUser,
    user,
    loading,
  } = useContext(DatabaseContext);

  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);
  const [followingUsers] = useState(new Map<string, User>());

  const createUserProfile = useCallback(
    async (user: User) => {
      return addUser(user);
    },
    [addUser]
  );

  const loadExistentUserFollowings = useCallback(async () => {
    setContextLoading(true);
    if (user && user.username && user.following > 0) {
      const followings = await getFollowingsUsernames(user.username);

      setFollowingUsernames(followings);
    } else {
      setFollowingUsernames([]);
    }
    setContextLoading(false);
  }, [getFollowingsUsernames, user]);

  useEffect(() => {
    setContextLoading(true);
    loadExistentUserFollowings().finally(() => setContextLoading(false));
  }, [loadExistentUserFollowings]);

  const follow = useCallback(
    async (username: string) => {
      if (!user) throw new Error('no user');

      return followUser({ user, toFollowUsername: username })
        .then(() => {
          setFollowingUsernames([username, ...followingUsernames]);
        })
        .catch(console.error);
    },
    [user, followUser, followingUsernames]
  );

  const unfollow = useCallback(
    async (username: string) => {
      if (!user) throw new Error('no user');

      return unfollowUser({ user, toUnfollowUser: username })
        .then(() => {
          setFollowingUsernames(
            followingUsernames.filter(
              (followedUser) => followedUser !== username
            )
          );
        })
        .catch(console.error);
    },
    [user, unfollowUser, followingUsernames]
  );

  const isFollowing = useCallback(
    async (username: string) => {
      return !!followingUsernames.find((following) => following === username);
    },
    [followingUsernames]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        loading: contextLoading || loading,
        followingUsernames,
        followingUsers,
        createUserProfile,
        isFollowing,
        follow,
        unfollow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
