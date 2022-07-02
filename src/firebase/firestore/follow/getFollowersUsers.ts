import {
  collection,
  CollectionReference,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { CustomError } from '../../../utils';
import { FOLLOWS_COLLECTION } from '../constants';
import { USER_DOESNT_EXIST } from '../../errorKeys';
import { firestore } from '../../firebaseConfig';

import { orderBy } from 'firebase/firestore';
import { getUserRef } from '../user';
import { getFollowRef } from './getRefs';

type Options = {
  size?: number;
  lastUser?: User;
};

export const getFollowersUsers = async (
  user: User,
  options?: Options
): Promise<User[]> => {
  // const userRef = getFollowRef(user.id);

  // const userDoc = await getDoc(userRef);

  // if (!userDoc.exists())
  //   throw new CustomError({
  //     message: 'User doesnt exists',
  //     code: USER_DOESNT_EXIST,
  //   });

  // const followersUsers = userDoc.data().followers;

  // if (followersUsers.length === 0) return [];

  // let q = query<FirestoreFollow>(
  //   collection(
  //     firestore,
  //     FOLLOWS_COLLECTION
  //   ) as CollectionReference<FirestoreFollow>,
  //   orderBy(documentId()),
  //   where('username', 'in', [...followersUsers]),
  //   limit(options?.size || 10)
  // );

  // if (options?.lastUser) {
  //   q = query(q, startAfter(options.lastUser.username));
  // }

  // const querySnapshot = await getDocs<FirestoreFollow>(q);

  // const usersIds: string[] = [];

  // querySnapshot.forEach((snap) => {
  //   if (snap.exists()) usersIds.push(snap.id);
  // });

  // const users: User[] = [];

  // await Promise.all(
  //   usersIds.map(async (id) => {
  //     return getDoc(getUserRef(id)).then((doc) => {
  //       if (doc.exists()) users.push({ ...doc.data(), id: doc.id });
  //     });
  //   })
  // );

  // return users;
  return [];
};
