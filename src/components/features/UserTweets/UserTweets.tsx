import { FC, useState, useEffect } from 'react';
import { Spinner, Tweet } from '../../ui';
import { useUserTweets } from '../../../hooks';
type Props = {
  user: User;
};
export const UserTweets: FC<Props> = ({ user }) => {
  const [loadingUserTweets, setLoadingUserTweets] = useState(true);
  const { getUserTweets } = useUserTweets();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    getUserTweets(user.username)
      .then(setTweets)
      .finally(() => setLoadingUserTweets(false));
  }, [user.username, getUserTweets]);

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
