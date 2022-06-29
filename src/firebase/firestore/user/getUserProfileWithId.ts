import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export const getUserProfileWithId = async (
  id: string
): Promise<User | null> => {
  const docRef = doc(
    firestore,
    'users',
    id
  ) as DocumentReference<FirestoreUser>;
  const docSnap = await getDoc<FirestoreUser>(docRef);

  if (!docSnap.exists()) return null;

  return { ...docSnap.data(), id };
};
