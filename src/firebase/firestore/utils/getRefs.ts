import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export const getRef = <T>(
  collection: string,
  id?: string
): DocumentReference<T> => {
  if (id) return doc(firestore, collection, id) as DocumentReference<T>;
  else return doc(getCollectionRef(collection)) as DocumentReference<T>;
};

export const getCollectionRef = <T>(
  collectionId: string
): CollectionReference<T> =>
  collection(firestore, collectionId) as CollectionReference<T>;
