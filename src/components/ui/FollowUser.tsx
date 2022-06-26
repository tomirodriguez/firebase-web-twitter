import { FC } from 'react';
import { User } from '../../icons';
import { FollowButton } from '.';

type Props = {
  user: User;
};

export const FollowUser: FC<Props> = ({ user }) => {
  return (
    <article
      className="hover:bg-hover-white flex items-center px-4 py-3"
      key={user.id}
    >
      <div className="aspect-square shrink-0">
        {user.image ? (
          <img
            className="rounded-full"
            src={user.image}
            alt={user.name}
            width={48}
            height={48}
          />
        ) : (
          <User />
        )}
      </div>
      <div className="grow px-5 flex flex-col">
        <h3>{user.name}</h3>
        <h4 className="text-secondary-text">@{user.username}</h4>
      </div>
      <div className="shrink-0">
        <FollowButton title={'Follow'} text="Follow" />
      </div>
    </article>
  );
};
