import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FOLLOWS_COLLECTION } from '../../constants';

export const isFollowing = async (
  user: string,
  follower: string
): Promise<boolean> => {
  const q = query<FirestoreFollows>(
    collection(
      firestore,
      FOLLOWS_COLLECTION
    ) as CollectionReference<FirestoreFollows>,
    where('username', '==', user),
    where('following', 'array-contains', follower)
  );

  const querySnapshot = await getDocs<FirestoreFollows>(q);

  if (querySnapshot.size === 0) return false;

  return true;
};
