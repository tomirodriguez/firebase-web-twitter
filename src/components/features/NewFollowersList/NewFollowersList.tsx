import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { Card, FollowUser, ShowMoreButton, Spinner } from '../../ui';

export const NewFollowersList = () => {
  const { user, discoverPeople } = useUser();
  const [loading, setLoading] = useState(true);
  const [followList, setFollowList] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !loading) return;

    discoverPeople(10)
      .then(setFollowList)
      .finally(() => setLoading(false));
  }, [user, discoverPeople, loading]);

  if (!user) return null;

  if (!loading && followList.length === 0) return null;

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
              <FollowUser user={newUser} showBio={false} />
            </li>
          ))}
        </ul>
        <ShowMoreButton
          onShowMore={() => {
            navigate('/people');
          }}
        />
      </Card>
    </div>
  );
};
