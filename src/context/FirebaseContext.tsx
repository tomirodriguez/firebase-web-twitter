import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { signInWithGoogle, signOut } from '../firebase/auth';
import {
  followUser,
  getFollowers,
  getFollowings,
  getFollowingsUsernames,
  isFollowing,
  onFollowerGain,
  onNewFollowing,
  unfollowUser,
} from '../firebase/firestore/follow';
import {
  getTweets,
  getUserTweets,
  onHomeFeedChange,
  postTweet,
} from '../firebase/firestore/tweet';
import { addUser, getUser, getUsers } from '../firebase/firestore/user';
import { useCallback } from 'react';

const defaultFirebaseContext: DatabaseContext = {
  user: null,
  loading: true,
  signInWithGoogle,
  signOut,
  addUser,
  getUser,
  followUser,
  unfollowUser,
  isFollowing,
  postTweet,
  getUserTweets,
  getTweets,
  onHomeFeedChange,
  getUsers,
  getFollowings,
  getFollowers,
  getFollowingsUsernames,
  onFollowerGain,
  onNewFollowing,
};

export const FirebaseContext = createContext<DatabaseContext>(
  defaultFirebaseContext
);

export const FirebaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFromAuth) => {
      setLoading(true);
      if (!userFromAuth) {
        setLoading(false);
        setUser(null);
        return;
      }

      const { uid: id, email, displayName, photoURL } = userFromAuth;
      const firebaseUser = await getUser({ id });
      if (!firebaseUser)
        setUser({
          lastUpdate: new Date(),
          id,
          email: email || '',
          bio: '',
          image: photoURL || '',
          followers: 0,
          following: 0,
          username: '',
          name: displayName || '',
        });
      else setUser({ ...firebaseUser, image: photoURL || '' });

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addUserAndUpdate = useCallback(async (user: User) => {
    setLoading(true);
    return addUser(user)
      .then(() => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        ...defaultFirebaseContext,
        addUser: addUserAndUpdate,
        user,
        loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
