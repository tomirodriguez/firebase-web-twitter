import { FC } from 'react';
import { useUser } from '../../../hooks/useUser';
import { User } from '../../../icons';

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
        {image ? (
          <img
            className="rounded-full object-cover aspect-square"
            src={image}
            alt={name}
            width={40}
            height={40}
          />
        ) : (
          <User size={40} />
        )}
      </div>
      <div className="grow text-left pl-4">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-sm text-secondary-text">@{username}</div>
      </div>
    </div>
  );
};
