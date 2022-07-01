import {
  collection,
  CollectionReference,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { CustomError } from '../../../utils';
import { FOLLOWS_COLLECTION } from '../../constants';
import { USER_DOESNT_EXIST } from '../../errorKeys';
import { firestore } from '../../firebaseConfig';
import { getFollowsRef, getUsersRef } from '../../utils';
import { orderBy } from 'firebase/firestore';

type Options = {
  size?: number;
  lastUser?: User;
};

export const getNewFollowers = async (
  user: User,
  options?: Options
): Promise<User[]> => {
  const userRef = getFollowsRef(user.id);

  const userDoc = await getDoc(userRef);

  if (!userDoc.exists())
    throw new CustomError({
      message: 'User doesnt exists',
      code: USER_DOESNT_EXIST,
    });

  const followingUsers = userDoc.data().following;

  let q = query<FirestoreFollows>(
    collection(
      firestore,
      FOLLOWS_COLLECTION
    ) as CollectionReference<FirestoreFollows>,
    orderBy('username'),
    where('username', 'not-in', [...followingUsers, user.username]),
    limit(options?.size || 10)
  );

  if (options?.lastUser) {
    q = query(q, startAfter(options.lastUser.username));
  }

  const querySnapshot = await getDocs<FirestoreFollows>(q);

  const usersIds: string[] = [];

  querySnapshot.forEach((snap) => {
    if (snap.exists()) usersIds.push(snap.id);
  });

  const users: User[] = [];

  await Promise.all(
    usersIds.map(async (id) => {
      return getDoc(getUsersRef(id)).then((doc) => {
        if (doc.exists()) users.push({ ...doc.data(), id: doc.id });
      });
    })
  );

  return users;
};