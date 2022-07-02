import { UpdateData, updateDoc } from 'firebase/firestore';
import { getRef } from '.';
import {
  FOLLOWS_COLLECTION,
  TWEETS_COLLECTION,
  USERS_COLLECTION,
} from '../constants';

export const updateInCollection = async <T>(
  collectionId: string,
  data: UpdateData<T>,
  id: string
) => {
  const docRef = getRef<T>(collectionId, id);

  return updateDoc(docRef, data);
};

export const updateUser = async (data: UpdateData<User>, id: string) => {
  return updateInCollection(USERS_COLLECTION, data, id);
};

export const updateFollow = async (
  data: UpdateData<FirestoreFollow>,
  id: string
) => {
  return updateInCollection(FOLLOWS_COLLECTION, data, id);
};

export const updateTweet = async (
  data: UpdateData<FirestoreTweet>,
  id: string
) => {
  return updateInCollection(TWEETS_COLLECTION, data, id);
};
