import { arrayRemove, increment, runTransaction } from 'firebase/firestore';
import { CustomError } from '../../../utils/CustomError';
import { firestore } from '../../firebaseConfig';
import { getUserProfileWithUsername } from './getUserProfileWithUsername';
import { isFollowing } from './isFollowing';
import { getFollowsRef, getUsersRef } from './utils';

export const unfollowUser = async (
  user: User,
  toFollow: string
): Promise<void> => {
  const following = await isFollowing(user.username, toFollow);

  if (!following)
    throw new CustomError({
      code: 'not_following',
      message: "You're not following this user",
    });

  const toFollowUser = await getUserProfileWithUsername(toFollow);

  if (!toFollowUser)
    throw new CustomError({
      code: 'follow_not_exists',
      message: "You're trying to unfollow a non existent user",
    });

  return runTransaction(firestore, async (transaction) => {
    // user data
    const userDocRef = getUsersRef(user.id);
    const userFollowsDocRef = getFollowsRef(user.id);

    // to follow data
    const toFollowDocRef = getUsersRef(toFollowUser.id);
    const toFollowFollowsDocRef = getFollowsRef(toFollowUser.id);

    transaction.update(userDocRef, { following: increment(-1) });

    transaction.update(userFollowsDocRef, {
      following: arrayRemove(toFollow),
    });

    transaction.update(toFollowDocRef, {
      followers: increment(-1),
    });

    transaction.update(toFollowFollowsDocRef, {
      followers: arrayRemove(user.username),
    });
  });
};
