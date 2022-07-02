import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { TWEETS_COLLECTION } from '../constants';

export const getUserTweets = async (
  username: string,
  size: number = 20,
  offset: number = 0
): Promise<Tweet[]> => {
  const q = query<FirestoreTweet>(
    collection(
      firestore,
      TWEETS_COLLECTION
    ) as CollectionReference<FirestoreTweet>,
    where('username', '==', username),
    orderBy('timestamp'),
    limit(size),
    startAt(offset)
  );

  const querySnapshot = await getDocs<FirestoreTweet>(q);

  const tweets: Tweet[] = [];

  querySnapshot.forEach((doc) => {
    const { likes, date, tweet: message, username: docUsername } = doc.data();

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

  return tweets;
};
