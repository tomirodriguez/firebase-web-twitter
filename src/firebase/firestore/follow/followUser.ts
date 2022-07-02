import { increment, Timestamp, writeBatch } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FOLLOW_INEXISTENT_USER } from '../errors';
import { getUser, getUserRef } from '../user';
import { getFollowRef } from './getRefs';

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

  const userRef = getUserRef(user.id);
  const userToFollowRef = getUserRef(userToFollow.id);

  const batch = writeBatch(firestore);

  batch.update(userRef, { following: increment(1) });
  batch.update(userToFollowRef, { followers: increment(1) });
  batch.set<FirestoreFollow>(getFollowRef(), {
    timestamp: Timestamp.now(),
    username: user.username,
    following: toFollowUsername,
  });

  return batch.commit();
};
