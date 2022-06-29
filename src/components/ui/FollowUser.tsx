import { FC } from 'react';
import { FollowButton } from '../features';
import { UserProfilePic } from './UserProfilePic';

type Props = {
  user: User;
};

export const FollowUser: FC<Props> = ({ user }) => {
  const { image, name, username } = user;

  return (
    <article
      className="hover:bg-hover-white flex items-center px-4 py-3"
      key={user.id}
    >
      <div className="aspect-square shrink-0">
        <UserProfilePic src={image} name={name} username={username} />
      </div>
      <div className="grow px-5 flex flex-col">
        <h3>{user.name}</h3>
        <h4 className="text-secondary-text">@{username}</h4>
      </div>
      <div className="shrink-0">
        <FollowButton username={username} />
      </div>
    </article>
  );
};
