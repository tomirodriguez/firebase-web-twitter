import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, UserList } from '../components/ui';
import { FirebaseContext } from '../context/FirebaseContext';

export const FollowingPage: FC = () => {
  const { username = '' } = useParams<UserProfileParams>();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showShowMoreButton, setShowShowMoreButton] = useState(true);
  const { getFollowingUsers, getUserProfileWithUsername } =
    useContext(FirebaseContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserProfileWithUsername(username).then(setUser);
  }, [username, getUserProfileWithUsername]);

  useEffect(() => {
    if (!user || !loading) return;

    const STARTING_AMOUT = 10;

    getFollowingUsers(user, { size: STARTING_AMOUT })
      .then((users) => {
        if (users.length < STARTING_AMOUT) setShowShowMoreButton(false);
        if (users.length > 0) setUsers(users);
      })
      .finally(() => setLoading(false));
  }, [user, loading, getFollowingUsers]);

  if (!user) return null;

  const handleShowMore = () => {
    const SHOW_MORE_SIZE = 1;
    getFollowingUsers(user, {
      size: SHOW_MORE_SIZE,
      lastUser: users[users.length - 1],
    }).then((moreUsers) => {
      if (moreUsers.length < SHOW_MORE_SIZE) setShowShowMoreButton(false);
      setUsers([...users, ...moreUsers]);
    });
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
