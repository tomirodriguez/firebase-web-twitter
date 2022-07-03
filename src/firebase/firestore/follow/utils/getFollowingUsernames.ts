import { getDocs, query, where } from 'firebase/firestore';
import { getFollowsCollectionRef } from './getRefs';

export const getFollowingUsernames = async (
  username: string
): Promise<string[]> => {
  const followingsQuery = query(
    getFollowsCollectionRef(),
    where('username', '==', username)
  );

  const querySnapshot = await getDocs(followingsQuery);

  const followings: string[] = [];
  querySnapshot.forEach((snap) => {
    followings.push(snap.data().follow);
  });

  return followings;
};
