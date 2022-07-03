import { FC, useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useUserTweets } from '../../../hooks';
import { Spinner, Tweet, UserProfile } from '../../ui';
import { FirebaseContext } from '../../../context/FirebaseContext';

type Props = {};

export const UserFeed: FC<Props> = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { getUserTweets } = useUserTweets();
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [loadingUserTweets, setLoadingUserTweets] = useState(true);
  const { getUser } = useContext(FirebaseContext);

  const loadUserFeed = useCallback(async () => {
    const loadUserProfile = async () => {
      const user = await getUser({ username });
      setUser(user);
      setLoadingUserProfile(false);
    };

    await loadUserProfile();
  }, [getUser, username]);

  const loadUserTweets = useCallback(async () => {
    if (!user) return;
    setLoadingUserTweets(true);
    const tweets = await getUserTweets(user.username);

    setTweets(tweets);
    setLoadingUserTweets(false);
  }, [getUserTweets, user]);

  useEffect(() => {
    loadUserFeed();
  }, [loadUserFeed]);

  useEffect(() => {
    if (user) loadUserTweets();
  }, [user, loadUserTweets]);

  const loadTweets = () => {
    if (!user) return null;
    return loadingUserTweets ? (
      <div className="w-full flex justify-center mt-20">
        <Spinner />
      </div>
    ) : (
      <ul className="border-t border-border">
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <Tweet
              image={user.image}
              author={user.name}
              username={tweet.username}
              message={tweet.tweet}
              date={tweet.date}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col">
      {loadingUserProfile ? (
        <div className="w-full flex justify-center mt-20">
          <Spinner />
        </div>
      ) : (
        <>
          <UserProfile
            username={username}
            name={user?.name}
            image={user?.image}
            bio={user?.bio}
            followers={user?.followers}
            following={user?.following}
          />
          {loadTweets()}
        </>
      )}
    </div>
  );
};
