import { limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getFollowsCollectionRef } from './utils/getRefs';

export const onNewFollowing: OnNewFollowing = (username, observer) => {
  const followQuery = query<FirestoreFollow>(
    getFollowsCollectionRef(),
    where('username', '==', username),
    orderBy('date', 'desc'),
    limit(1)
  );

  let firstListen = true;
  const unsubscribe = onSnapshot<FirestoreFollow>(
    followQuery,
    (querySnapshot) => {
      const { follow } = querySnapshot.docs[0].data();

      if (!firstListen) observer(follow);
      else firstListen = false;
    }
  );

  return unsubscribe;
};
