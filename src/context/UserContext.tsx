import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';

const defaultFirebaseFunction = (): Promise<DbResponse> =>
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

  useEffect(() => {
    onAuthStateChanged(auth, (fireUser) => {
      setLoading(true);
      if (fireUser) {
        console.log('HAY USUARIO', fireUser?.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const tweet = (tweet: string): Promise<DbResponse> => {
    alert(`SE VA A TWITTER ${tweet}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, errorKey: '' });
      }, 300);
    });
  };

  const logout = (): Promise<DbResponse> => {
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