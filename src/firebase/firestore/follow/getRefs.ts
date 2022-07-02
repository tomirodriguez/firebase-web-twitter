import { FOLLOWS_COLLECTION } from '../constants';
import { getRef, getCollectionRef } from '../utils';

export const getFollowRef = (id?: string) =>
  getRef<FirestoreFollow>(FOLLOWS_COLLECTION, id);

export const getFollowsCollectionRef = () =>
  getCollectionRef<FirestoreFollow>(FOLLOWS_COLLECTION);
