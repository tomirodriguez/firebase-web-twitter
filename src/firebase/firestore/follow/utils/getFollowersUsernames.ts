import { getDocs, query, where } from 'firebase/firestore';
import { getFollowsCollectionRef } from './getRefs';

export const getFollowersUsernames = async (
  username: string
): Promise<string[]> => {
  const followingsQuery = query(
    getFollowsCollectionRef(),
    where('follow', '==', username)
  );

  const querySnapshot = await getDocs(followingsQuery);

  const followings: string[] = [];
  querySnapshot.forEach((snap) => {
    followings.push(snap.data().username);
  });

  return followings;
};
