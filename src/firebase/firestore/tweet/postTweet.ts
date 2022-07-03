import { setDoc, Timestamp } from 'firebase/firestore';
import { getTweetRef } from './utils/getRefs';

export const postTweet: PostTweet = async ({ username, tweet }) => {
  const timelineRef = getTweetRef();
  const toPost: FirestoreTweet = {
    likes: 0,
    tweet,
    username,
    date: Timestamp.fromDate(new Date()),
  };

  return setDoc(timelineRef, toPost);
};
