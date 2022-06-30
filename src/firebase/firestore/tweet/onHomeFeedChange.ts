import {
  collection,
  CollectionReference,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { TIMELINE_COLLECTION } from '../../constants';
import { firestore } from '../../firebaseConfig';

export const onHomeFeedChange = (
  user: User,
  observer: any,
  following: string[],
  size: number = 20,
  offset: number = 0
): Unsubscribe => {
  const followingAndUser = [...following, user.username];

  const q = query<FirestoreTweet>(
    collection(
      firestore,
      TIMELINE_COLLECTION
    ) as CollectionReference<FirestoreTweet>,
    where('username', 'in', followingAndUser),
    orderBy('timestamp'),
    limit(size),
    startAt(offset)
  );

  return onSnapshot<FirestoreTweet>(q, (querySnapshot) => {
    const tweets: Tweet[] = [];

    querySnapshot.forEach((doc) => {
      const {
        likes,
        timestamp,
        tweet: message,
        username: docUsername,
      } = doc.data();

      if (!timestamp) return;

      const { seconds, nanoseconds } = timestamp;

      const tweet: Tweet = {
        id: doc.id,
        likes,
        username: docUsername,
        tweet: message,
        timestamp: new Timestamp(seconds, nanoseconds).toDate(),
      };
      tweets.push(tweet);
    });

    const sortedTweets = tweets.sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      if (b.timestamp > a.timestamp) return 1;
      else return 0;
    });

    observer(sortedTweets);
  });
};
