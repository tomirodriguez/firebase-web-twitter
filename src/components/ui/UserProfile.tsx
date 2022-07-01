import { FC } from 'react';
import { Link } from 'react-router-dom';
import { UserProfilePic } from '.';
import { useUser } from '../../hooks';
import { FollowInteraction } from '../features';

type Props = {
  username: string;
  name?: string;
  image?: string;
  bio?: string;
  following?: number;
  followers?: number;
};

export const UserProfile: FC<Props> = ({
  username,
  name,
  followers,
  following,
  image,
  bio,
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
          {bio && <p className="mt-4">{bio}</p>}
        </div>
        {user?.username !== username && name && (
          <FollowInteraction username={username} />
        )}
      </div>

      {name ? (
        <div className="flex w-full text-xs text-secondary-text items-center mt-2">
          <Link className="mr-4 hover:underline" to={`/following/${username}`}>
            <span className="font-bold text-white text-sm">{following}</span>{' '}
            Following
          </Link>
          <Link className="hover:underline" to={`/followers/${username}`}>
            <span className="font-bold text-white text-sm">{followers}</span>{' '}
            Followers
          </Link>
        </div>
      ) : (
        <div className="mt-6 w-3/4 mx-auto">
          <p className="text-4xl font-black">This account doesn’t exist</p>
          <p className="text-md text-secondary-text mt-2">
            Try searching for another.
          </p>
        </div>
      )}
    </div>
  );
};
