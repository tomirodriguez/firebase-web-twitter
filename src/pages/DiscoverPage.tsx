import { FC, useState } from 'react';
import { Spinner, UserList } from '../components/ui';
import { useDiscover } from '../hooks/useDiscover';
import { useUser } from '../hooks/useUser';

const INITIAL_USERS = 10;

export const DiscoverPage: FC = () => {
  const { loading, users, showMore } = useDiscover(INITIAL_USERS);
  const [showShowMoreButton, setShowShowMoreButton] = useState(true);

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <UserList
      users={users}
      onShowMore={showMore}
      showShowMoreButton={showShowMoreButton}
    />
  );
};
