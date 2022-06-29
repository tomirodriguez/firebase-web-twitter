import { FC } from 'react';
import { useUser } from '../../../hooks/useUser';
import { UserProfilePic } from '../../ui';

export const SignOut: FC = () => {
  const { user, signOut } = useUser();

  if (!user) return null;

  const { image, name, username } = user;

  return (
    <div
      aria-label="Sign out"
      role={'button'}
      className="bg-red rounded-full p-3 mb-4 mr-4 flex items-center hover:bg-hover-white"
      onClick={signOut}
    >
      <div className="shrink-0">
        <UserProfilePic
          size={40}
          linkToProfile={false}
          name={name}
          src={image}
          username={username}
        />
      </div>
      <div className="grow text-left pl-4">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-sm text-secondary-text">@{username}</div>
      </div>
    </div>
  );
};
