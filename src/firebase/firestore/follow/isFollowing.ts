import { getDocs, query, where } from 'firebase/firestore';
import { getFollowsCollectionRef } from './getRefs';

export const isFollowing: IsFollowing = async ({ username, following }) => {
  const followQuery = query<FirestoreFollow>(
    getFollowsCollectionRef(),
    where('username', '==', username),
    where('following', '==', following)
  );

  const querySnapshot = await getDocs<FirestoreFollow>(followQuery);

  return querySnapshot.size !== 0;
};
