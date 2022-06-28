import { doc, DocumentReference, setDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export const setUserData = async (user: User): Promise<void> => {
  const { id, ...userWithoutId } = user;
  const docRef = doc(
    firestore,
    'users',
    id
  ) as DocumentReference<FirestoreUser>;
  return setDoc<FirestoreUser>(docRef, { ...userWithoutId });
};
