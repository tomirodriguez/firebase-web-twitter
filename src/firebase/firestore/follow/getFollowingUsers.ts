import {
  collection,
  CollectionReference,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { FOLLOWS_COLLECTION } from '../../constants';
import { firestore } from '../../firebaseConfig';
import { getFollowsRef } from '../../utils';

export const getFollowingUsers = async (user: User) => {
  const followingRef = getFollowsRef(user.id);

  const doc = await getDoc(followingRef);

  if (!doc.exists()) throw new Error();

  const followingUsernames = doc.data().following;

  const users: User[] = [];

  const q = query<FirestoreUser>(
    collection(
      firestore,
      FOLLOWS_COLLECTION
    ) as CollectionReference<FirestoreUser>,
    where('username', 'in', [followingUsernames, user.username])
  );

  const querySnapshot = await getDocs<FirestoreUser>(q);

  querySnapshot.forEach((snapshot) => {
    users.push({ ...snapshot.data(), id: snapshot.id });
  });

  return users;
};
