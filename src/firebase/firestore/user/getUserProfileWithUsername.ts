import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export const getUserProfileWithUsername = async (
  username: string
): Promise<User | null> => {
  const q = query<FirestoreUser>(
    collection(firestore, 'users') as CollectionReference<FirestoreUser>,
    where('username', '==', username)
  );
  const querySnapshot = await getDocs<FirestoreUser>(q);

  let user: User | null = null;

  querySnapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });

  return user;
};
