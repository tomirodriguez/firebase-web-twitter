import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../../../hooks';
import { Spinner, UserProfile } from '../../ui';

type Props = {};

export const UserFeed: FC<Props> = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const [user, setUser] = useState<User | null>(null);
  const { getUserProfile } = useUserProfile();
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  // const [loadingUserTweets, setLoadingUserTweets] = useState(true);

  const loadUserFeed = useCallback(async () => {
    const loadUserProfile = async () => {
      const user = await getUserProfile(username);
      if (user) setUser(user);
      else {
      }
      setUser(user);
      setLoadingUserProfile(false);
    };

    await loadUserProfile();
  }, [getUserProfile, username]);

  useEffect(() => {
    loadUserFeed();
  }, [loadUserFeed]);

  return (
    <div className="flex flex-col">
      {loadingUserProfile ? (
        <div className="w-full flex justify-center mt-20">
          <Spinner />
        </div>
      ) : (
        <UserProfile
          username={username}
          name={user?.name}
          image={user?.image}
          bio={user?.bio}
          followers={user?.followers}
          following={user?.following}
        />
      )}
    </div>
  );
};
