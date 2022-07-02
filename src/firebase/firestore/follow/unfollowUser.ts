import {
  getDocs,
  increment,
  query,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { UNFOLLOW_INEXISTENT_USER } from '../errors';
import { getUser, getUserRef } from '../user';
import { getFollowRef, getFollowsCollectionRef } from './getRefs';

export const unfollowUser: UnfollowUser = async ({
  user,
  toUnfollowUser,
}): Promise<void> => {
  const userToUnfollow = await getUser({ username: toUnfollowUser });

  if (!userToUnfollow) throw UNFOLLOW_INEXISTENT_USER;

  const followQuery = query<FirestoreFollow>(
    getFollowsCollectionRef(),
    where('username', '==', user.username),
    where('following', '==', toUnfollowUser)
  );

  const querySnapshot = await getDocs<FirestoreFollow>(followQuery);

  if (querySnapshot.size === 0) return;

  const followRefId = querySnapshot.docs[0].id;

  const userRef = getUserRef(user.id);
  const userToFollowRef = getUserRef(userToUnfollow.id);

  const batch = writeBatch(firestore);

  batch.update(userRef, { following: increment(-11) });
  batch.update(userToFollowRef, { followers: increment(-11) });
  batch.delete(getFollowRef(followRefId));

  return batch.commit();
};
