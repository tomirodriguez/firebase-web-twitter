import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, UserList } from '../components/ui';
import { useFollowings } from '../hooks/useFollowings';

const STARTING_AMOUT = 10;

export const FollowingPage: FC = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const { getFollowings, loading } = useFollowings();
  const [users, setUsers] = useState<User[]>([]);
  const [showShowMoreButton, setShowShowMoreButton] = useState(true);

  useEffect(() => {
    getFollowings(username, 10).then((users) => {
      if (users.length < STARTING_AMOUT) setShowShowMoreButton(false);
      if (users.length > 0) setUsers(users);
    });
  }, [username, getFollowings]);

  const handleShowMore = () => {
    // const SHOW_MORE_SIZE = 1;
    // getFollowingUsers(user.username, {
    //   size: SHOW_MORE_SIZE,
    //   lastUser: users[users.length - 1].username,
    // }).then((moreUsers) => {
    //   if (moreUsers.length < SHOW_MORE_SIZE) setShowShowMoreButton(false);
    //   setUsers([...users, ...moreUsers]);
    // });
  };

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <UserList
      users={users}
      onShowMore={handleShowMore}
      showShowMoreButton={showShowMoreButton}
    />
  );
};
