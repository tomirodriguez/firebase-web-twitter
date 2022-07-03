import { useState, useEffect, useCallback, useContext } from 'react';
import { useUser } from './useUser';
import { DatabaseContext } from '../context/DatabaseContext';

export const useHomeFeed: UseHomeFeedHook = () => {
  const { user } = useUser();
  const { getTweets, getFollowingsUsernames } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(true);
  const [lastTweet, setLastTweet] = useState<Tweet | null>(null);
  const [feed, setFeed] = useState<Tweet[]>([]);

  useEffect(() => {
    if (!user) return;

    getFollowingsUsernames(user.username).then((followings) => {
      getTweets([...followings, user.username])
        .then(setFeed)
        .finally(() => setLoading(false));
    });
  }, [user, getFollowingsUsernames, getTweets]);

  useEffect(() => {
    if (feed.length > 0) setLastTweet(feed[feed.length - 1]);
  }, [feed]);

  const showMore = useCallback(async () => {
    return [];
  }, [user]);

  return { loading, showMore, feed };
};
