import { getDoc } from 'firebase/firestore';
import { getFollowsRef } from '../../utils';

export const getFollowingUsernames = async (user: User): Promise<string[]> => {
  const followingRef = getFollowsRef(user.id);

  const doc = await getDoc(followingRef);

  if (!doc.exists()) throw new Error();

  const followingUsernames = doc.data().following;

  return followingUsernames;
  // const users: User[] = [];

  // const q = query<FirestoreUser>(
  //   collection(
  //     firestore,
  //     USERS_COLLECTION
  //   ) as CollectionReference<FirestoreUser>,
  //   where('username', 'in', [followingUsernames, user.username])
  // );

  // const querySnapshot = await getDocs<FirestoreUser>(q);

  // querySnapshot.forEach((snapshot) => {
  //   users.push({ ...snapshot.data(), id: snapshot.id });
  // });

  // return users;
};
