import { writeBatch } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { getFollowsRef, getUsersRef } from '../../utils';

export const setUserProfile = async (user: User): Promise<void> => {
  const { id, ...userWithoutId } = user;

  const userRef = getUsersRef(id);

  const followsRef = getFollowsRef(id);

  const batch = writeBatch(firestore);

  batch.set(userRef, { ...userWithoutId });
  batch.set(followsRef, {
    username: user.username,
    followers: [],
    following: [],
  });

  return batch.commit();
};
