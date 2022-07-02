import { deleteDoc } from 'firebase/firestore';
import { getRef } from '.';
import {
  FOLLOWS_COLLECTION,
  TWEETS_COLLECTION,
  USERS_COLLECTION,
} from '../constants';

export const removeFromCollection = async (
  collectionId: string,
  id: string
) => {
  const docRef = getRef(collectionId, id);

  return deleteDoc(docRef);
};

export const removeUser = async (id: string) => {
  return removeFromCollection(USERS_COLLECTION, id);
};

export const removeFollow = async (id: string) => {
  return removeFromCollection(FOLLOWS_COLLECTION, id);
};

export const removeTweet = async (id: string) => {
  return removeFromCollection(TWEETS_COLLECTION, id);
};
