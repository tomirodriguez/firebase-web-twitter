import { FC } from 'react';
import { FollowUser, ShowMoreButton } from '.';

type Props = {
  users: User[];
  onShowMore: () => void;
  showShowMoreButton?: boolean;
};

export const UserList: FC<Props> = ({
  users,
  onShowMore,
  showShowMoreButton = false,
}) => {
  return (
    <article>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <FollowUser user={user} />
          </li>
        ))}
      </ul>
      {showShowMoreButton && <ShowMoreButton onShowMore={onShowMore} />}
    </article>
  );
};
