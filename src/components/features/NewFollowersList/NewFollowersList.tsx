import { useContext, useEffect, useState } from 'react';
import { Card, FollowUser, ShowMoreButton, Spinner } from '../../ui';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { useUser } from '../../../hooks/useUser';

export const NewFollowersList = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getNewFollowers } = useContext(FirebaseContext);
  const [followList, setFollowList] = useState<User[]>([]);

  useEffect(() => {
    if (!user || !loading) return;

    getNewFollowers(user)
      .then(setFollowList)
      .finally(() => setLoading(false));
  }, [user, getNewFollowers, loading]);

  if (!user) return null;

  return loading ? (
    <div className="w-full flex items-center justify-center py-4">
      <Spinner />
    </div>
  ) : (
    <div className="mb-4">
      <Card title="Who to follow">
        <ul>
          {followList.map((newUser) => (
            <li key={newUser.id}>
              <FollowUser user={newUser} />
            </li>
          ))}
        </ul>
        <ShowMoreButton onShowMore={() => {}} />
      </Card>
    </div>
  );
};
