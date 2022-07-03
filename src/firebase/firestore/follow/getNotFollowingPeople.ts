import { getDocs, limit, query } from 'firebase/firestore';
import { getUserCollectionRef } from '../user/getRefs';

export const getNotFollowingPeople: GetNotFollowingPeople = async (
  user,
  options
) => {
  const qUsers = query(getUserCollectionRef(), limit(10));
  const querySnapshot = await getDocs(qUsers);

  const users: User[] = [];
  querySnapshot.forEach((userSnap) => {
    users.push(userSnap.data());
  });

  return users;
};
