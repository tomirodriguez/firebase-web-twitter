import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { getUser } from '../firebase/firestore/user';
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { getFollowingsUsernames, addUser, followUser, unfollowUser } =
    useContext(DatabaseContext);
  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);
  const [followingUsers, setFollowingUsers] = useState(new Map<string, User>());

  const createUserProfile = useCallback(
    async (user: User) => {
      setLoading(true);
      return addUser(user)
        .then(() => setUser(user))
        .finally(() => setLoading(false));
    },
    [addUser]
  );

  const loadExistentUser = useCallback(
    async (user: User) => {
      if (user.following > 0) {
        const followings = await getFollowingsUsernames(user.username);
        setFollowingUsernames(followings);
      }

      setUser(user);
    },
    [getFollowingsUsernames]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (listenedUser) => {
      setLoading(true);
      if (!listenedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { uid: id, email, displayName } = listenedUser;
      const firebaseUser = await getUser({ id });
      if (!firebaseUser) {
        setUser({
          lastUpdate: new Date(),
          id,
          email: email || '',
          bio: '',
          followers: 0,
          following: 0,
          username: '',
          name: displayName || '',
        });
        setLoading(false);
      } else {
        loadExistentUser(firebaseUser).finally(() => setLoading(false));
      }
    });
    return () => unsubscribe();
  }, [loadExistentUser]);

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
        loading,
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
