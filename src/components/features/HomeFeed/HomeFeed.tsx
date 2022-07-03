import { FC, useCallback, useEffect, useState } from 'react';
import { useUser } from '../../../hooks';
import { useFindUser } from '../../../hooks/useFindUser';
import { useHomeFeed } from '../../../hooks/useHomeFeed';
import { ShowMoreButton, Spinner, Tweet } from '../../ui';

export const HomeFeed: FC = () => {
  const { user } = useUser();
  const { findUser } = useFindUser();
  const { feed, loading } = useHomeFeed();

  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const [newTweets, setNewTweets] = useState<Tweet[]>([]);
  const [noMoreTweets, setNoMoreTweets] = useState(false);

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

  // const saveNewTweet = useCallback(
  //   (newTweet: Tweet) => {
  //     if (newTweets.find((tweet) => newTweet.id === tweet.id)) return;

  //     const isMyTweet = newTweet.username === user?.username;

  //     if (isMyTweet) setTweets([newTweet, ...tweets]);
  //     else setNewTweets([newTweet, ...newTweets]);
  //   },
  //   [newTweets, tweets, user]
  // );

  // useEffect(() => {
  // const filteredNewTweets = newTweets.filter((newTweet) => {
  //   const isShowing = tweets.find((tweet) => tweet.id === newTweet.id);
  //   if (isShowing) return false;
  //   return true;
  // });
  // if (filteredNewTweets.length !== newTweets.length)
  //   setNewTweets(filteredNewTweets);
  // }, [newTweets, tweets]);

  // useEffect(() => {
  //   if (!user || loadingFollowingUsers || loading) return;

  // const unsubcsribe = onHomeFeedChange(user, saveNewTweet, [
  //   ...followingUsernames,
  // ]);

  // return () => unsubcsribe;
  // }, [user, onHomeFeedChange, loadingFollowingUsers, loading, saveNewTweet]);

  // const getUsersData = useCallback(async () => {
  // if (feedUsers.size === followingUsernames.length + 1) return;
  // const updatedFeedUsers = new Map(feedUsers);
  // const promises: Promise<void>[] = [];
  // tweets.forEach((tweet) => {
  //   if (!updatedFeedUsers.has(tweet.username)) {
  //     promises.push(
  //       getUser({ username: tweet.username }).then((user) => {
  //         if (user) {
  //           updatedFeedUsers.set(user.username, user);
  //         }
  //       })
  //     );
  //   }
  // });
  // await Promise.all(promises);
  // setFeedUsers(updatedFeedUsers);
  // }, [feed, feedUsers, getUser]);

  // useEffect(() => {
  // if (!loading) getUsersData();
  // }, [loading, getUsersData]);

  if (!user) return null;

  const newTweetsCount = newTweets.length;

  const handleShowNewTweets = () => {
    // const convinedTweets = [...newTweets, ...feed];
    // convinedTweets.sort((a, b) => {
    //   if (a.date < b.date) return 1;
    //   if (b.date < a.date) return -1;
    //   return 0;
    // });
    // setTweets([...newTweets, ...feed]);
    // setNewTweets([]);
  };

  const handleShowMore = () => {
    // const lastTweet = tweets.slice(-1)[0];
    // setLoadingShowMore(true);
    // getFeedBeforeDate({ size: 10, date: lastTweet.date })
    //   .then((moreTweets) => {
    //     setTweets([...tweets, ...moreTweets]);
    //     if (moreTweets.length === 0) setNoMoreTweets(true);
    //   })
    //   .finally(() => setLoadingShowMore(false));
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
        !noMoreTweets && (
          <div className="border-b border-border">
            <ShowMoreButton onShowMore={handleShowMore} />
          </div>
        )
      )}
    </div>
  );
};
