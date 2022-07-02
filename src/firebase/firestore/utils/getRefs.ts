import {
  DocumentReference,
  doc,
  collection,
  CollectionReference,
} from 'firebase/firestore';
import {
  USERS_COLLECTION,
  FOLLOWS_COLLECTION,
  TWEETS_COLLECTION,
} from '../constants';
import { firestore } from '../../firebaseConfig';

export const getRef = <T>(
  collection: string,
  id?: string
): DocumentReference<T> => {
  if (id) return doc(firestore, collection, id) as DocumentReference<T>;
  else return doc(firestore, collection) as DocumentReference<T>;
};

export const getCollectionRef = <T>(
  collectionId: string
): CollectionReference<T> =>
  collection(firestore, collectionId) as CollectionReference<T>;
