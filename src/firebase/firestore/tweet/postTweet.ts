import { serverTimestamp } from 'firebase/firestore';
import { TIMELINE_COLLECTION } from '../../constants';
import { addToCollection } from '../../utils';

export const postTweet = async (user: User, tweet: string): Promise<void> => {
  const toPost: FirestoreTweet = {
    likes: 0,
    tweet,
    user: user.id,
    timestamp: serverTimestamp(),
  };

  return addToCollection(TIMELINE_COLLECTION, toPost);
};
