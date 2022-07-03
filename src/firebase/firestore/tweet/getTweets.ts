import {
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { getTweetsCollectionRef } from './utils/getRefs';

export const getTweets: GetTweets = async (usernames, options) => {
  const chunkSize = 10;
  const size = options?.size || 20;

  let q = query<FirestoreTweet>(
    getTweetsCollectionRef(),
    orderBy('date', 'desc'),
    startAfter(Timestamp.fromDate(options?.date || new Date())),
    limit(size)
  );

  const tweets: Tweet[] = [];

  for (let i = 0; i < usernames.length; i += chunkSize) {
    const chunk = usernames.slice(i, i + chunkSize);
    const newQuery = query(q, where('username', 'in', chunk));

    const querySnapshot = await getDocs<FirestoreTweet>(newQuery);

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
  }

  const sortByDate = (array: Tweet[]) => {
    return array.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (b.date < a.date) return -1;
      return 0;
    });
  };

  return sortByDate(tweets);
};
