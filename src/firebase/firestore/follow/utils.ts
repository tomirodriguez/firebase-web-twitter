import { doc, DocumentReference } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { USERS_COLLECTION, FOLLOWS_COLLECTION } from '../../constants';

const getRef = <T>(collection: string, id: string): DocumentReference<T> => {
  return doc(firestore, collection, id) as DocumentReference<T>;
};

export const getUsersRef = (id: string) =>
  getRef<FirestoreUser>(USERS_COLLECTION, id);

export const getFollowsRef = (id: string) =>
  getRef<FirestoreFollows>(FOLLOWS_COLLECTION, id);
