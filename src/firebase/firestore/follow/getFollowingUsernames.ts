import { getDoc } from 'firebase/firestore';

export const getFollowingUsernames = async (user: User): Promise<string[]> => {
  // const followingRef = getFollowRef(user.id);

  // const doc = await getDoc(followingRef);

  // if (!doc.exists()) throw new Error();

  // const followingUsernames = doc.data().following;

  // return followingUsernames;
  return [];
};
