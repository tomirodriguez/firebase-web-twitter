import { doc, DocumentReference, writeBatch } from 'firebase/firestore';
import { FOLLOWS_COLLECTION, USERS_COLLECTION } from '../../constants';
import { firestore } from '../../firebaseConfig';

export const setUserProfile = async (user: User): Promise<void> => {
  const { id, ...userWithoutId } = user;

  const userRef = doc(
    firestore,
    USERS_COLLECTION,
    id
  ) as DocumentReference<FirestoreUser>;

  const followsRef = doc(
    firestore,
    FOLLOWS_COLLECTION,
    id
  ) as DocumentReference<FirestoreFollows>;

  const batch = writeBatch(firestore);

  batch.set(userRef, { ...userWithoutId });
  batch.set(followsRef, {
    username: user.username,
    followers: [],
    following: [],
  });

  return batch.commit();
};
