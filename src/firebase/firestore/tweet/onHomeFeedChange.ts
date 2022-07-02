import {
  collection,
  CollectionReference,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { TWEETS_COLLECTION } from '../constants';
import { firestore } from '../../firebaseConfig';

export const onHomeFeedChange = (
  user: User,
  observer: (tweet: Tweet) => void,
  following: string[]
): Unsubscribe => {
  const followingAndUser = [...following, user.username];

  const q = query<FirestoreTweet>(
    collection(
      firestore,
      TWEETS_COLLECTION
    ) as CollectionReference<FirestoreTweet>,
    where('username', 'in', followingAndUser),
    orderBy('timestamp', 'desc'),
    limit(1)
  );

  let firstCall = true;

  return onSnapshot<FirestoreTweet>(q, (querySnapshot) => {
    const tweets: Tweet[] = [];

    querySnapshot.forEach((doc) => {
      const { likes, date, tweet: message, username: docUsername } = doc.data();

      if (!date) return;

      const { seconds, nanoseconds } = date;

      const tweet: Tweet = {
        id: doc.id,
        likes,
        username: docUsername,
        tweet: message,
        timestamp: new Timestamp(seconds, nanoseconds).toDate(),
      };
      tweets.push(tweet);
    });

    if (!firstCall) observer(tweets[0]);
    else firstCall = false;
  });
};
