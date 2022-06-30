import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  setDoc,
} from 'firebase/firestore';
import {
  FOLLOWS_COLLECTION,
  TIMELINE_COLLECTION,
  USERS_COLLECTION,
} from './constants';
import { firestore } from './firebaseConfig';

const getRef = <T>(collection: string, id: string): DocumentReference<T> => {
  return doc(firestore, collection, id) as DocumentReference<T>;
};

export const getUsersRef = (id: string) =>
  getRef<FirestoreUser>(USERS_COLLECTION, id);

export const getFollowsRef = (id: string) =>
  getRef<FirestoreFollows>(FOLLOWS_COLLECTION, id);

export const getTimelineRef = (id: string) =>
  getRef<FirestoreTweet>(TIMELINE_COLLECTION, id);

export const addToCollection = async <T>(
  collectionId: string,
  data: T,
  id?: string
) => {
  let docRef: DocumentReference<T>;

  if (!id) {
    docRef = doc<T>(
      collection(firestore, collectionId) as CollectionReference<T>
    );
  } else {
    docRef = getRef<T>(collectionId, id);
  }

  return setDoc(docRef, data);
};
