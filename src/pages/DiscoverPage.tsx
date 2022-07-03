import { FC } from 'react';
import { Spinner, UserList } from '../components/ui';
import { useDiscover } from '../hooks/useDiscover';

const INITIAL_USERS = 10;

export const DiscoverPage: FC = () => {
  const { loading, users, showMore, moreLeft } = useDiscover(INITIAL_USERS);

  return loading ? (
    <div className="w-full py-12 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <UserList
      users={users}
      onShowMore={showMore}
      showShowMoreButton={moreLeft}
    />
  );
};
