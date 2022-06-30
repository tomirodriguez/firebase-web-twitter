import { arrayUnion, increment, runTransaction } from 'firebase/firestore';
import { CustomError } from '../../../utils/CustomError';
import { ALREADY_FOLLOWING, USER_DOESNT_EXISTS } from '../../errorKeys';
import { firestore } from '../../firebaseConfig';
import { getUserProfileWithUsername } from '../user';
import { isFollowing } from './isFollowing';
import { getFollowsRef, getUsersRef } from '../../utils';

export const followUser = async (
  user: User,
  toFollow: string
): Promise<void> => {
  const following = await isFollowing(user.username, toFollow);

  if (following)
    throw new CustomError({
      code: ALREADY_FOLLOWING,
      message: "You're already following this user",
    });

  const toFollowUser = await getUserProfileWithUsername(toFollow);

  if (!toFollowUser)
    throw new CustomError({
      code: USER_DOESNT_EXISTS,
      message: "You're trying to follow a non existent user",
    });

  return runTransaction(firestore, async (transaction) => {
    // user data
    const userDocRef = getUsersRef(user.id);
    const userFollowsDocRef = getFollowsRef(user.id);

    // to follow data
    const toFollowDocRef = getUsersRef(toFollowUser.id);
    const toFollowFollowsDocRef = getFollowsRef(toFollowUser.id);

    transaction.update(userDocRef, { following: increment(1) });

    transaction.update(userFollowsDocRef, {
      following: arrayUnion(toFollow),
    });

    transaction.update(toFollowDocRef, {
      followers: increment(1),
    });

    transaction.update(toFollowFollowsDocRef, {
      followers: arrayUnion(user.username),
    });
  });
};
