import { useState, useEffect, useCallback, useContext } from 'react';
import { useUser } from './useUser';
import { DatabaseContext } from '../context/DatabaseContext';

export const useHomeFeed: UseHomeFeedHook = () => {
  const { user } = useUser();
  const { getTweets, getFollowingsUsernames } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(true);
  const [lastTweet, setLastTweet] = useState<Tweet | null>(null);
  const [feed, setFeed] = useState<Tweet[]>([]);
  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);

  const getFeed = useCallback(
    async (size: number, date: Date) => {
      if (followingUsernames.length === 0 || !user) return [];
      return getTweets([...followingUsernames, user.username], { size, date });
    },
    [getTweets, user, followingUsernames]
  );

  useEffect(() => {
    if (!user) return;
    getFollowingsUsernames(user.username).then(setFollowingUsernames);
  }, [user, getFollowingsUsernames]);

  useEffect(() => {
    getFeed(15, new Date())
      .then(setFeed)
      .finally(() => setLoading(false));
  }, [followingUsernames, user, getFeed]);

  useEffect(() => {
    if (feed.length > 0) setLastTweet(feed[feed.length - 1]);
  }, [feed]);

  const showMore = useCallback(async () => {
    if (lastTweet)
      getFeed(10, lastTweet.date).then((moreTweets) => {
        console.log({ moreTweets });
        setFeed([...feed, ...moreTweets]);
      });
  }, [lastTweet, getFeed, feed]);

  return { loading, showMore, feed };
};
