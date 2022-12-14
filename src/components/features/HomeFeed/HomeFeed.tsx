import { FC, useCallback, useEffect, useState } from 'react';
import { useUser } from '../../../hooks';
import { useFindUser } from '../../../hooks/useFindUser';
import { useHomeFeed } from '../../../hooks/useHomeFeed';
import { ShowMoreButton, Spinner, Tweet } from '../../ui';

export const HomeFeed: FC = () => {
  const { user } = useUser();
  const { findUser } = useFindUser();
  const {
    feed,
    loading,
    showMore,
    moreLeft,
    showNewestTweets,
    newTweetsCount,
  } = useHomeFeed();

  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const [feedUsers, setFeedUsers] = useState<Map<string, User>>(
    new Map<string, User>()
  );

  const updateUsersData = useCallback(async () => {
    if (!user) return;
    const feedUsernames = Array.from(
      new Set<string>(feed.map((feed) => feed.username))
    );

    if (feedUsernames.length === feedUsers.size) return;

    const newUsersData = new Map<string, User>();
    await Promise.all(
      feedUsernames.map(async (username) => {
        if (username === user.username) {
          newUsersData.set(user.username, user);
          return;
        }

        const userToStore =
          feedUsers.get(username) || (await findUser(username));
        if (userToStore) newUsersData.set(username, userToStore);
      })
    );

    setFeedUsers(newUsersData);
  }, [feedUsers, findUser, feed, user]);

  useEffect(() => {
    updateUsersData();
  }, [updateUsersData]);

  const handleShowMore = () => {
    setLoadingShowMore(true);
    showMore().finally(() => setLoadingShowMore(false));
  };

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="mb-12">
      {newTweetsCount > 0 && (
        <button
          onClick={showNewestTweets}
          className="w-full py-4 border-b border-border text-primary-blue hover:bg-hover-white"
        >{`Show ${newTweetsCount} Tweet${
          newTweetsCount > 1 ? 's' : ''
        }`}</button>
      )}
      <ul>
        {[...feed].map((tweet) => {
          const userAuthor = feedUsers.get(tweet.username);

          return (
            <li key={tweet.id}>
              <Tweet
                username={tweet.username}
                author={userAuthor?.name || ''}
                message={tweet.tweet}
                date={tweet.date}
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
        moreLeft && (
          <div className="border-b border-border">
            <ShowMoreButton onShowMore={handleShowMore} />
          </div>
        )
      )}
    </div>
  );
};
