import { FC, useContext, useEffect, useState, useCallback } from 'react';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { useUser } from '../../../hooks';
import { Spinner, Tweet } from '../../ui';
import { Timestamp } from 'firebase/firestore';

export const HomeFeed: FC = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [loadingFollowingUsers, setLoadingFollowingUsers] = useState(true);
  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweets, setNewTweets] = useState<Tweet[]>([]);
  const [noMoreTweets, setNoMoreTweets] = useState(false);

  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);
  const [feedUsers, setFeedUsers] = useState<Map<string, User>>(
    new Map<string, User>()
  );

  const {
    onHomeFeedChange,
    getFollowingUsernames,
    getUserProfileWithUsername,
    getHomeFeed,
  } = useContext(FirebaseContext);

  useEffect(() => {
    if (!user) return;

    getHomeFeed(user)
      .then(setTweets)
      .finally(() => setLoading(false));
  }, [user, getHomeFeed]);

  const saveNewTweet = useCallback(
    (newTweet: Tweet) => {
      if (newTweets.find((tweet) => newTweet.id === tweet.id)) return;
      setNewTweets([newTweet, ...newTweets]);
    },
    [newTweets]
  );

  useEffect(() => {
    if (!user || loadingFollowingUsers || loading) return;

    const unsubcsribe = onHomeFeedChange(user, saveNewTweet, [
      ...followingUsernames,
    ]);

    return () => unsubcsribe;
  }, [
    user,
    onHomeFeedChange,
    loadingFollowingUsers,
    followingUsernames,
    loading,
    saveNewTweet,
  ]);

  useEffect(() => {
    if (!user) return;

    const feedUsersWithUser = new Map<string, User>();
    feedUsersWithUser.set(user.username, user);
    setFeedUsers(feedUsersWithUser);
    getFollowingUsernames(user)
      .then((users) => setFollowingUsernames(users))
      .finally(() => setLoadingFollowingUsers(false));
  }, [user, getFollowingUsernames]);

  const getUsersData = useCallback(async () => {
    if (feedUsers.size === followingUsernames.length + 1) return;

    const updatedFeedUsers = new Map(feedUsers);

    const promises: Promise<void>[] = [];

    tweets.forEach((tweet) => {
      if (!updatedFeedUsers.has(tweet.username)) {
        promises.push(
          getUserProfileWithUsername(tweet.username).then((user) => {
            if (user) {
              updatedFeedUsers.set(user.username, user);
            }
          })
        );
      }
    });

    await Promise.all(promises);

    setFeedUsers(updatedFeedUsers);
  }, [tweets, feedUsers, getUserProfileWithUsername, followingUsernames]);

  useEffect(() => {
    if (!loading) getUsersData();
  }, [loading, getUsersData]);

  if (!user) return null;

  const newTweetsCount = newTweets.length;

  const handleShowNewTweets = () => {
    setTweets([...newTweets, ...tweets]);
    setNewTweets([]);
  };

  const handleShowMore = () => {
    const lastTweet = tweets.slice(-1)[0];

    const timestamp = lastTweet
      ? Timestamp.fromDate(lastTweet.timestamp)
      : Timestamp.now();

    setLoadingShowMore(true);
    getHomeFeed(user, { size: 10, timestamp })
      .then((moreTweets) => {
        setTweets([...tweets, ...moreTweets]);
        if (moreTweets.length === 0) setNoMoreTweets(true);
      })
      .finally(() => setLoadingShowMore(false));
  };

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="mb-12">
      {newTweetsCount > 0 && (
        <button
          onClick={handleShowNewTweets}
          className="w-full py-4 border-b border-border text-primary-blue hover:bg-hover-white"
        >{`Show ${newTweetsCount} Tweet${
          newTweetsCount > 1 ? 's' : ''
        }`}</button>
      )}
      <ul>
        {[...tweets].map((tweet) => {
          const userAuthor = feedUsers.get(tweet.username);

          return (
            <li key={tweet.id}>
              <Tweet
                username={tweet.username}
                author={userAuthor?.name || ''}
                message={tweet.tweet}
                date={tweet.timestamp}
                image={userAuthor?.image}
              />
            </li>
          );
        })}
      </ul>
      {loadingShowMore ? (
        <div className="w-full py-12 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        !noMoreTweets && (
          <button
            onClick={handleShowMore}
            className="w-full py-4 border-b border-border text-primary-blue hover:bg-hover-white"
          >
            Show more
          </button>
        )
      )}
    </div>
  );
};
