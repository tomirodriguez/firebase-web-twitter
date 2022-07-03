import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { TWEETS_COLLECTION } from '../constants';

export const getTweets: GetTweets = async (usernames, options) => {
  const q = query<FirestoreTweet>(
    collection(
      firestore,
      TWEETS_COLLECTION
    ) as CollectionReference<FirestoreTweet>,
    orderBy('date', 'desc'),
    startAfter(Timestamp.fromDate(options?.date || new Date())),
    limit(options?.size || 20),
    where('username', 'in', usernames)
  );

  const querySnapshot = await getDocs<FirestoreTweet>(q);

  const tweets: Tweet[] = [];

  querySnapshot.forEach((doc) => {
    const { likes, date, tweet, username } = doc.data();

    const { seconds, nanoseconds } = date;

    tweets.push({
      id: doc.id,
      likes,
      tweet,
      username,
      date: new Timestamp(seconds, nanoseconds).toDate(),
    });
  });

  return tweets;
};
