import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { signInWithGoogle } from '../firebase/auth/signInWithGoogle';
import { fbGetUserProfile, fbSetUserProfile } from '../firebase/firestore/user';

const defaultFirebaseFunction = (): Promise<void> =>
  new Promise((resolve, reject) => reject());

const defaultContext = {
  user: null,
  loading: true,
  tweet: defaultFirebaseFunction,
  logout: defaultFirebaseFunction,
  signIn: defaultFirebaseFunction,
  setUserProfile: defaultFirebaseFunction,
};

export const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onUserChange = async (fireUser: FirebaseUser | null) => {
    setLoading(true);
    if (fireUser) {
      try {
        const user = await fbGetUserProfile(fireUser.uid);
        setUser(user);
      } catch (error) {
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
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onUserChange);

    return unsubscribe;
  }, []);

  const tweet = (tweet: string): Promise<void> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject('To be implemented');
      }, 300);
    });
  };

  const logout = (): Promise<void> => {
    setUser(null);
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject('To be implemented');
      }, 300);
    });
  };

  const signIn = async () => {
    setLoading(true);
    return signInWithGoogle().finally(() => setLoading(false));
  };

  const setUserProfile = async (user: User) => {
    setLoading(true);
    return fbSetUserProfile(user)
      .then(() => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  };

  return (
    <UserContext.Provider
      value={{ user, loading, tweet, logout, signIn, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
