import {
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { getUserCollectionRef } from '../user/getRefs';

export const getUsers: GetUsers = async (options) => {
  const exclude = options?.exclude || [];

  const size = options?.size || 20;

  let q = query<User>(getUserCollectionRef(), orderBy('username'), limit(size));

  if (options?.lastUser) q = query(q, startAfter(options.lastUser.username));

  const chunkSize = 10;

  const notFollowingUsers: User[] = [];

  for (
    let i = 0;
    i < exclude.length && notFollowingUsers.length < size;
    i += chunkSize
  ) {
    const chunk = exclude.slice(i, i + chunkSize);
    const newQuery = query(q, where('username', 'not-in', chunk));

    const querySnapshot = await getDocs<User>(newQuery);

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (!exclude.find((excluded) => excluded === user.username))
        notFollowingUsers.push(doc.data());
    });
  }

  return notFollowingUsers;
};
