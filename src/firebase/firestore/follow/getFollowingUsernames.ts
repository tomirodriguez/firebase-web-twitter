import { getDoc } from 'firebase/firestore';
import { getFollowsRef } from '../../utils';

export const getFollowingUsernames = async (user: User): Promise<string[]> => {
  const followingRef = getFollowsRef(user.id);

  const doc = await getDoc(followingRef);

  if (!doc.exists()) throw new Error();

  const followingUsernames = doc.data().following;

  return followingUsernames;
};
