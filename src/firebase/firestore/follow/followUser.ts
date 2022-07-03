import { doc, increment, writeBatch } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FOLLOW_INEXISTENT_USER } from '../errors';
import { getUser, getUserRef } from '../user';
import { getFollowsCollectionRef } from './getRefs';

import { isFollowing } from './isFollowing';

export const followUser: FollowUser = async ({
  user,
  toFollowUsername,
}): Promise<void> => {
  const userToFollow = await getUser({ username: toFollowUsername });

  if (!userToFollow) throw FOLLOW_INEXISTENT_USER;

  const following = await isFollowing({
    username: user.username,
    following: toFollowUsername,
  });

  if (following) return;

  const batch = writeBatch(firestore);

  batch.update(getUserRef(user.username), { following: increment(1) });
  batch.update(getUserRef(toFollowUsername), { followers: increment(1) });
  batch.set<FirestoreFollow>(doc(getFollowsCollectionRef()), {
    date: new Date(),
    username: user.username,
    follow: toFollowUsername,
  });

  return batch.commit();
};
