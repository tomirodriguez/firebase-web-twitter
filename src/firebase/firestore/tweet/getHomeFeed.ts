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
import { TIMELINE_COLLECTION } from '../../constants';
import { getFollowsRef } from '../../utils';
import { getDoc } from 'firebase/firestore';
import { CustomError } from '../../../utils';
import { USER_DOESNT_EXISTS } from '../../errorKeys';

type Options = {
  size?: number;
  timestamp?: Timestamp;
};

type HomeFeedType = (user: User, options?: Options) => Promise<Tweet[]>;

export const getHomeFeed: HomeFeedType = async (user: User, options) => {
  const followsDocRef = getFollowsRef(user.id);
  const followsDocSnap = await getDoc(followsDocRef);

  if (!followsDocSnap.exists())
    throw new CustomError({
      message: 'The user doesnt exists',
      code: USER_DOESNT_EXISTS,
    });

  const { following } = followsDocSnap.data();

  const followingAndUser = [...following, user.username];

  const q = query<FirestoreTweet>(
    collection(
      firestore,
      TIMELINE_COLLECTION
    ) as CollectionReference<FirestoreTweet>,
    orderBy('timestamp', 'desc'),
    startAfter(options?.timestamp || Timestamp.now()),
    limit(options?.size || 20),
    where('username', 'in', followingAndUser)
  );

  const querySnapshot = await getDocs<FirestoreTweet>(q);

  const tweets: Tweet[] = [];

  querySnapshot.forEach((doc) => {
    const {
      likes,
      timestamp,
      tweet: message,
      username: docUsername,
    } = doc.data();

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

  return tweets;
};
