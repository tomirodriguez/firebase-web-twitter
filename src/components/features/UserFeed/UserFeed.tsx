import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFindUser } from '../../../hooks/useFindUser';
import { Spinner, UserProfile } from '../../ui';
import { UserTweets } from '../UserTweets';

type Props = {};

export const UserFeed: FC<Props> = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const { findUser } = useFindUser();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    findUser(username)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [username, findUser]);

  return (
    <div className="flex flex-col">
      {loading ? (
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
      {user && <UserTweets user={user} />}
    </div>
  );
};
