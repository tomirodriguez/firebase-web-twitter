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
import { getUserData } from '../firebase/getUserData';

const defaultFirebaseFunction = (): Promise<{}> =>
  new Promise((resolve) =>
    resolve({ success: false, errorKey: 'CONTEXT_LOADING_ERROR' })
  );

const defaultContext = {
  user: null,
  loading: true,
  tweet: defaultFirebaseFunction,
  logout: defaultFirebaseFunction,
};

export const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onUserChange = async (fireUser: FirebaseUser | null) => {
    setLoading(true);
    if (fireUser) {
      try {
        await getUserData(fireUser.uid);
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

  const tweet = (tweet: string): Promise<{}> => {
    alert(`SE VA A TWITTER ${tweet}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, errorKey: '' });
      }, 300);
    });
  };

  const logout = (): Promise<{}> => {
    setUser(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, errorKey: '' });
      }, 300);
    });
  };

  return (
    <UserContext.Provider value={{ user, loading, tweet, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
