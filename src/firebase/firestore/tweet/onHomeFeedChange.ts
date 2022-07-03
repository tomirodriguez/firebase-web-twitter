import {
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { getTweetsCollectionRef } from './utils';

export const onHomeFeedChange: OnHomeFeedChange = (
  user,
  observer,
  following
) => {
  const followingAndUser = [...following, user.username];

  const chunkSize = 10;

  let q = query<FirestoreTweet>(
    getTweetsCollectionRef(),
    orderBy('date', 'desc'),
    limit(1)
  );

  const unsubscritions: Unsubscribe[] = [];

  for (let i = 0; i < followingAndUser.length; i += chunkSize) {
    const chunk = followingAndUser.slice(i, i + chunkSize);
    const newQuery = query(q, where('username', 'in', chunk));

    const unsubscribe = onSnapshot<FirestoreTweet>(
      newQuery,
      (querySnapshot) => {
        const { likes, username, tweet, date } = querySnapshot.docs[0].data();
        const { seconds, nanoseconds } = date;

        observer({
          likes,
          username,
          tweet,
          id: querySnapshot.docs[0].id,
          date: new Timestamp(seconds, nanoseconds).toDate(),
        });
      }
    );

    unsubscritions.push(unsubscribe);
  }

  return unsubscritions;
};
