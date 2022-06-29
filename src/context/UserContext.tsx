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

const defaultFirebaseFunction = (): Promise<void> =>
  new Promise((_, reject) => reject());

const defaultContext: UserContextType = {
  user: null,
  loading: true,
  tweet: defaultFirebaseFunction,
  signOut: defaultFirebaseFunction,
  signIn: defaultFirebaseFunction,
  setUserProfile: defaultFirebaseFunction,
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

  const tweet = (tweet: string): Promise<void> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject('To be implemented');
      }, 300);
    });
  };

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
      .then(() => {
        setUser(user);
      })
      .finally(() => setLoading(false));
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
