import { limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getFollowsCollectionRef } from './utils/getRefs';

export const onFollowerGain: OnFollowerGain = (username, observer) => {
  const followQuery = query<FirestoreFollow>(
    getFollowsCollectionRef(),
    where('follow', '==', username),
    orderBy('date', 'desc'),
    limit(1)
  );

  let firstListen = true;
  const unsubscribe = onSnapshot<FirestoreFollow>(
    followQuery,
    (querySnapshot) => {
      const { username } = querySnapshot.docs[0].data();

      if (!firstListen) observer(username);
      else firstListen = false;
    }
  );

  return unsubscribe;
};
