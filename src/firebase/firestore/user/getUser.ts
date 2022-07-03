import { getDocs, query, where } from 'firebase/firestore';
import { CustomError } from '../../../utils';
import { USERS_COLLECTION } from '../constants';
import { INVALID_CALL, USER_DOESNT_EXIST_ERROR } from '../errors';
import { getDocument } from '../utils';
import { getUserCollectionRef } from './getRefs';

const getUserWithUsername = async (username: string) => {
  return getDocument<User>(USERS_COLLECTION, username).then((doc) => {
    if (!doc.exists()) throw USER_DOESNT_EXIST_ERROR;
    return { ...doc.data() };
  });
};

const getUserWithId = async (id: string) => {
  const q = query<User>(getUserCollectionRef(), where('id', '==', id));

  const querySnapshot = await getDocs(q);

  let user: User | null = null;

  querySnapshot.forEach((snap) => {
    user = { ...snap.data() };
  });

  if (!user) throw USER_DOESNT_EXIST_ERROR;
  return user;
};

export const getUser: GetUser = async ({ id, username }) => {
  if (username) return getUserWithUsername(username);
  if (id) return getUserWithId(id);

  throw new CustomError({
    code: INVALID_CALL,
    message: 'You must provide at least one of the id or username',
  });
};
