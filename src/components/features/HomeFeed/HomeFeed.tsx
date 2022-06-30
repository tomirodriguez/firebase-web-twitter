import { FC, useContext, useEffect, useState, useCallback } from 'react';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { useUser } from '../../../hooks/useUser';
import { Spinner, Tweet } from '../../ui';

export const HomeFeed: FC = () => {
  const { user } = useUser();
  const [newTweets, setNewTweets] = useState<Tweet[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { onHomeFeedChange, getFollowingUsers } = useContext(FirebaseContext);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [loadingFollowingUsers, setLoadingFollowingUsers] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadTweets = useCallback(
    (tweetsListened: Tweet[]) => {
      if (loading) setTweets(tweetsListened);
      else setNewTweets(tweetsListened);
      setLoading(false);
    },
    [loading]
  );

  useEffect(() => {
    if (!user || loadingFollowingUsers) return;

    const followingUsernames = followingUsers.map(
      (followingUser) => followingUser.username
    );

    const unsubcsribe = onHomeFeedChange(user, loadTweets, [
      ...followingUsernames,
      user.username,
    ]);

    return unsubcsribe;
  }, [
    user,
    onHomeFeedChange,
    loadingFollowingUsers,
    followingUsers,
    loadTweets,
  ]);

  useEffect(() => {
    if (!user) return;

    getFollowingUsers(user)
      .then((users) => setFollowingUsers(users))
      .finally(() => setLoadingFollowingUsers(false));
  }, [user, getFollowingUsers]);

  if (!user) return null;

  const newTweetsCount = newTweets.length - tweets.length;

  const handleShowNewTweets = () => {
    setTweets(newTweets);
  };

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div>
      {newTweetsCount > 0 && (
        <button
          onClick={handleShowNewTweets}
          className="w-full py-4 border-b border-border text-primary-blue hover:bg-hover-white"
        >{`Show ${newTweetsCount} Tweet${
          newTweetsCount > 1 ? 's' : ''
        }`}</button>
      )}
      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet.id}>
              <Tweet
                username={tweet.username}
                author={''}
                message={tweet.tweet}
                date={tweet.timestamp}
                image={undefined}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
