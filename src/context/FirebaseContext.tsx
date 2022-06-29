import { createContext, FC, PropsWithChildren } from 'react';
import {
  getUserProfileWithId,
  getUserProfileWithUsername,
  setUserProfile,
  isFollowing,
} from '../firebase/firestore/user';
import { signInWithGoogle, signOut } from '../firebase/auth';

const defaultFirebaseContext: FirebaseContextType = {
  getUserProfileWithId,
  getUserProfileWithUsername,
  setUserProfile,
  signInWithGoogle,
  signOut,
  isFollowing,
};

export const FirebaseContext = createContext<FirebaseContextType>(
  defaultFirebaseContext
);

export const FirebaseProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={defaultFirebaseContext}>
      {children}
    </FirebaseContext.Provider>
  );
};
