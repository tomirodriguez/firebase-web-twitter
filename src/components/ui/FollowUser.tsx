import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FollowInteraction } from '../features';
// import { FollowInteraction } from '../features';
import { UserProfilePic } from './UserProfilePic';

type Props = {
  user: User;
  showBio?: boolean;
};

export const FollowUser: FC<Props> = ({ user, showBio = true }) => {
  const { image, name, username } = user;

  return (
    <article className="hover:bg-hover-white px-4 py-3" key={user.id}>
      <div className="flex items-start">
        <div className="aspect-square shrink-0 mr-5">
          <UserProfilePic src={image} name={name} username={username} />
        </div>
        <div className="grow">
          <div className="flex justify-between  items-center w-full">
            <Link to={`/users/${username}`} className="grow pr-5 flex flex-col">
              <h3>{user.name}</h3>
              <h4 className="text-secondary-text">@{username}</h4>
            </Link>
            <div className="shrink-0">
              <FollowInteraction username={username} />
            </div>
          </div>
          {showBio && <p className="mt-2">{user.bio}</p>}
        </div>
      </div>
    </article>
  );
};
