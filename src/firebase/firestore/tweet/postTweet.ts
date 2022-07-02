import { setDoc, Timestamp } from 'firebase/firestore';
import { TWEETS_COLLECTION } from '../constants';
import { getRef } from '../utils/getRefs';

export const postTweet: PostTweet = async ({ username, tweet }) => {
  const timelineRef = getRef<FirestoreTweet>(TWEETS_COLLECTION);
  const toPost: FirestoreTweet = {
    likes: 0,
    tweet,
    username,
    date: Timestamp.now(),
  };

  return setDoc(timelineRef, toPost);
};
