import { TWEETS_COLLECTION } from '../../constants';
import { getRef, getCollectionRef } from '../../utils';

export const getTweetRef = (id?: string) =>
  getRef<FirestoreTweet>(TWEETS_COLLECTION, id);

export const getTweetsCollectionRef = () =>
  getCollectionRef<FirestoreTweet>(TWEETS_COLLECTION);
