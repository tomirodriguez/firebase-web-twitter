import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
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
import { FirebaseContext } from './FirebaseContext';
import { CustomError } from '../utils/CustomError';

const defaultFirebaseFunction = (): Promise<void> =>
  new Promise((_, reject) => reject());

const defaultContext: UserContextType = {
  user: null,
  loading: true,
  tweet: defaultFirebaseFunction,
  signOut: defaultFirebaseFunction,
  signIn: defaultFirebaseFunction,
  setUserProfile: () => new Promise((_, reject) => reject()),
  isFollowing: () => new Promise((_, reject) => reject()),
  followUser: () => new Promise((_, reject) => reject()),
  unfollowUser: () => new Promise((_, reject) => reject()),
};

export const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const {
    getUserProfileWithId,
    setUserProfile: saveUserProfileInFirestore,
    signInWithGoogle,
    signOut: signOutFromFirebase,
    isFollowing: isFollowingFromFirestore,
    followUser: followUserFirestore,
    unfollowUser: unfollowUserFirestore,
    postTweet,
  } = useContext(FirebaseContext);

  const onUserChange = useCallback(
    async (fireUser: FirebaseUser | null) => {
      setLoading(true);
      if (fireUser) {
        const user = await getUserProfileWithId(fireUser.uid);
        if (user) setUser(user);
        else
          setUser({
            email: fireUser.email || '',
            id: fireUser.uid,
            image: fireUser.photoURL || '',
            name: '',
            username: '',
            bio: '',
            followers: 0,
            following: 0,
          });
      } else {
        setUser(null);
      }

      setLoading(false);
    },
    [getUserProfileWithId]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onUserChange);

    return unsubscribe;
  }, [onUserChange]);

  const signOut = (): Promise<void> => {
    return signOutFromFirebase();
  };

  const signIn = async () => {
    setLoading(true);
    return signInWithGoogle().finally(() => setLoading(false));
  };

  const setUserProfile = async (user: User) => {
    setLoading(true);
    return saveUserProfileInFirestore(user)
      .then(() => setUser(user))
      .finally(() => setLoading(false));
  };

  const isFollowing = async (username: string) => {
    if (!user)
      throw new CustomError({ code: 'not_logged', message: 'Not logged in' });

    return isFollowingFromFirestore(user.username, username);
  };

  const followUser = async (username: string) => {
    if (!user)
      throw new CustomError({ code: 'not_logged', message: 'Not logged in' });

    return followUserFirestore(user, username).then(() => {
      const updatedUser: User = { ...user, following: user.following + 1 };
      setUser(updatedUser);
    });
  };

  const unfollowUser = async (username: string) => {
    if (!user)
      throw new CustomError({ code: 'not_logged', message: 'Not logged in' });

    return unfollowUserFirestore(user, username).then(() => {
      const updatedUser: User = { ...user, following: user.following - 1 };
      setUser(updatedUser);
    });
  };

  const tweet = async (tweet: string) => {
    if (!user)
      throw new CustomError({ code: 'not_logged', message: 'Not logged in' });

    return postTweet(user, tweet);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        tweet,
        signOut,
        signIn,
        setUserProfile,
        isFollowing,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
