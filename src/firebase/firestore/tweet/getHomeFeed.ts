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
import { TIMELINE_COLLECTION } from '../../constants';
import { getFollowsRef } from '../../utils';
import { getDoc } from 'firebase/firestore';
import { CustomError } from '../../../utils';
import { USER_DOESNT_EXISTS } from '../../errorKeys';

export const getHomeFeed = async (
  user: User,
  size: number = 20,
  offset: number = 0
): Promise<Tweet[]> => {
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
    where('username', 'in', followingAndUser),
    orderBy('timestamp'),
    limit(size),
    startAt(offset)
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
