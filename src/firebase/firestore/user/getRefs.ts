import { USERS_COLLECTION } from '../constants';
import { getCollectionRef, getRef } from '../utils';

export const getUserRef = (username: string) =>
  getRef<User>(USERS_COLLECTION, username);

export const getUserCollectionRef = () =>
  getCollectionRef<User>(USERS_COLLECTION);
