import { FC } from 'react';
import { UserProfilePic } from '.';
import { useUser } from '../../hooks';
import { FollowButton } from '../features';

type Props = {
  username: string;
  name?: string;
  image?: string;
  following?: number;
  followers?: number;
};

export const UserProfile: FC<Props> = ({
  username,
  name,
  followers,
  following,
  image,
}) => {
  const { user } = useUser();

  return (
    <div className="py-6 px-10">
      <div className="flex justify-between items-end">
        <div>
          <UserProfilePic
            name={name}
            username={username}
            size={145}
            src={image}
          />
          <h1 className="font-bold text-xl mt-6">{name ?? `@${username}`}</h1>
          {name && <h2 className="text-sm text-secondary-text">@{username}</h2>}
        </div>
        {user?.username !== username && <FollowButton username={username} />}
      </div>

      {name && (
        <div className="flex w-full text-xs text-secondary-text items-center mt-2">
          <div className="mr-4">
            <span className="font-bold text-white text-sm">{following}</span>{' '}
            Following
          </div>
          <div>
            <span className="font-bold text-white text-sm">{followers}</span>{' '}
            Followers
          </div>
        </div>
      )}
    </div>
  );
};
