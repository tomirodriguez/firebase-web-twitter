import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};
