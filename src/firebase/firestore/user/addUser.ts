import { setDoc } from 'firebase/firestore';
import { getRef } from '../utils/getRefs';
import { USERS_COLLECTION } from '../constants';

export const addUser: AddUser = (userToAdd) => {
  return setDoc(getRef(USERS_COLLECTION, userToAdd.username), userToAdd);
};
