import { FC, PropsWithChildren } from 'react';
import { FirebaseContext } from '../context';
import { DUMMY_USER } from './mocks';

export const TestingFirebaseProvider: FC<
  PropsWithChildren & Partial<FirebaseContextType>
> = ({
  children,
  getUserProfileWithId = () =>
    new Promise<User>((resolve) => resolve(DUMMY_USER)),
  getUserProfileWithUsername = () =>
    new Promise<User>((resolve) => resolve(DUMMY_USER)),
  signInWithGoogle = () => new Promise<void>((resolve) => resolve()),
  setUserProfile: saveUserProfile = () =>
    new Promise<void>((resolve) => resolve()),
  signOut = () => new Promise<void>((resolve) => resolve()),
}) => {
  return (
    <FirebaseContext.Provider
      value={{
        getUserProfileWithId,
        getUserProfileWithUsername,
        setUserProfile: saveUserProfile,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};