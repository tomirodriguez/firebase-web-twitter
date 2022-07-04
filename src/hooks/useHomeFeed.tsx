import { useState, useEffect, useCallback, useContext } from 'react';
import { useUser } from './useUser';
import { DatabaseContext } from '../context/DatabaseContext';

export const useHomeFeed: UseHomeFeedHook = () => {
  const { user, followingUsernames } = useUser();
  const { getTweets, onHomeFeedChange } = useContext(DatabaseContext);

  const [loading, setLoading] = useState(true);
  const [lastTweet, setLastTweet] = useState<Tweet | null>(null);
  const [feed, setFeed] = useState<Tweet[]>([]);
  const [hiddenFeed, setHiddenFeed] = useState<Tweet[]>([]);
  const [moreLeft, setMoreLeft] = useState(true);
  const [newTweets, setNewTweets] = useState<Tweet[]>([]);

  const getFeed = useCallback(
    async (size: number, date: Date) => {
      if (!user) {
        setMoreLeft(false);
        return [];
      }
      return getTweets([...followingUsernames, user.username], {
        size,
        date,
      }).then((newTweets) => {
        if (newTweets.length === 0) setMoreLeft(false);
        return newTweets;
      });
    },
    [getTweets, user, followingUsernames]
  );

  useEffect(() => {
    getFeed(15, new Date())
      .then((tweets) => {
        setHiddenFeed(tweets);
        setFeed(tweets.slice(0, 15));
      })
      .finally(() => setLoading(false));
  }, [followingUsernames, user, getFeed]);

  useEffect(() => {
    if (feed.length > 0) setLastTweet(feed[feed.length - 1]);
  }, [feed]);

  const showMore = useCallback(async () => {
    const SHOW_MORE_SIZE = 10;

    if (hiddenFeed.length >= feed.length + SHOW_MORE_SIZE) {
      setFeed(hiddenFeed.slice(0, feed.length + SHOW_MORE_SIZE));
      return;
    }

    if (lastTweet)
      getFeed(SHOW_MORE_SIZE, lastTweet.date).then((moreTweets) => {
        const joinFeed = [...hiddenFeed, ...moreTweets];
        setHiddenFeed(joinFeed);
        setFeed(joinFeed.slice(0, feed.length + SHOW_MORE_SIZE));
      });
  }, [lastTweet, getFeed, feed, hiddenFeed]);

  useEffect(() => {
    const uniqueTweets = newTweets.filter((newTweet) => {
      const isInFeed = feed.find((tweet) => tweet.id === newTweet.id);
      return !isInFeed;
    });

    if (uniqueTweets.length !== newTweets.length) setNewTweets(uniqueTweets);
  }, [newTweets, feed]);

  useEffect(() => {
    if (!user || loading) return () => {};

    const observer = (listenedTweet: Tweet) => {
      const inListenedTweets = newTweets.find(
        (newTweet) => newTweet.id === listenedTweet.id
      );

      if (inListenedTweets) return;

      const tweetsWithSameId = feed.filter(
        (tweet) => tweet.id === listenedTweet.id
      );

      if (tweetsWithSameId.length !== 0) return;

      const isMyTweet = listenedTweet.username === user?.username;

      if (isMyTweet) {
        setFeed([listenedTweet, ...feed]);
        setHiddenFeed([listenedTweet, ...hiddenFeed]);
      } else {
        setNewTweets([listenedTweet, ...newTweets]);
      }
    };

    const unsubscriptions = onHomeFeedChange(
      user,
      observer,
      followingUsernames
    );

    return () => unsubscriptions.forEach((unsubscription) => unsubscription());
  }, [
    user,
    onHomeFeedChange,
    newTweets,
    feed,
    hiddenFeed,
    followingUsernames,
    loading,
  ]);

  const showNewestTweets = useCallback(() => {
    setFeed([...newTweets, ...feed]);
    setHiddenFeed([...newTweets, ...hiddenFeed]);
    setNewTweets([]);
  }, [newTweets, feed, hiddenFeed]);

  return {
    loading,
    showMore,
    feed,
    moreLeft,
    newTweetsCount: newTweets.length,
    showNewestTweets,
  };
};
