import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useFindUser } from '../../../hooks/useFindUser';
import { Spinner, UserProfile } from '../../ui';
import { UserTweets } from '../UserTweets';

type Props = {};

export const UserFeed: FC<Props> = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const { userFound, loading } = useFindUser(username);

  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="w-full flex justify-center mt-20">
          <Spinner />
        </div>
      ) : (
        <UserProfile
          username={username}
          name={userFound?.name}
          image={userFound?.image}
          bio={userFound?.bio}
          followers={userFound?.followers}
          following={userFound?.following}
        />
      )}
      {userFound && <UserTweets user={userFound} />}
    </div>
  );
};
