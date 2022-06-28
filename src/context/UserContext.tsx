import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { getUserData } from '../firebase/firestore/getUserData';
import { signInWithGoogle } from '../firebase/auth/signInWithGoogle';
import { setUserData } from '../firebase/firestore/setUserData';

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
        const user = await getUserData(fireUser.uid);
        setUser(user);
      } catch (error) {
        setUser({
          email: fireUser.email || '',
          id: fireUser.uid,
          name: '',
          username: '',
          bio: '',
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
    return setUserData(user)
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
