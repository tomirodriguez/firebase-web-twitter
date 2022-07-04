import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { getUser } from '../firebase/firestore/user';
import { DatabaseContext } from './DatabaseContext';
import { useCallback } from 'react';

const defaultUserContext: UserContext = {
  user: null,
  loading: true,
  followingsUsernames: [],
  followingsUsers: new Map(),
  createUserProfile: async () => {
    throw new Error('To implement');
  },
};

export const UserContext = createContext<UserContext>(defaultUserContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { getFollowingsUsernames, addUser } = useContext(DatabaseContext);
  const [followingsUsernames, setFollowingsUsernames] = useState<string[]>([]);
  const [followingsUsers, setFollowingsUsers] = useState(
    new Map<string, User>()
  );

  const createUserProfile = useCallback(async (user: User) => {
    setLoading(true);
    return addUser(user)
      .then(() => setUser(user))
      .finally(() => setLoading(false));
  }, []);
  const loadExistentUser = useCallback(
    async (user: User) => {
      if (user.following > 0) {
        const followings = await getFollowingsUsernames(user.username);
        setFollowingsUsernames(followings);
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

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        followingsUsernames,
        followingsUsers,
        createUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
