import { createContext, FC, PropsWithChildren } from 'react';
import {
  getUserProfileWithId,
  getUserProfileWithUsername,
  saveUserProfile,
} from '../firebase/firestore/user';
import { signInWithGoogle } from '../firebase/auth';

const defaultFirebaseContext: FirebaseContextType = {
  getUserProfileWithId,
  getUserProfileWithUsername,
  saveUserProfile,
  signInWithGoogle,
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
