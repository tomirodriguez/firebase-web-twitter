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
    where('follow', '==', toUnfollowUser)
  );

  const querySnapshot = await getDocs<FirestoreFollow>(followQuery);

  if (querySnapshot.size === 0) throw new Error('THEY ARE NOT FOLLOWING');

  const followRefId = querySnapshot.docs[0].id;

  const userRef = getUserRef(user.username);
  const userToFollowRef = getUserRef(toUnfollowUser);

  const batch = writeBatch(firestore);

  batch.update(userRef, { following: increment(-1) });
  batch.update(userToFollowRef, { followers: increment(-1) });
  batch.delete(getFollowRef(followRefId));

  return batch.commit();
};
