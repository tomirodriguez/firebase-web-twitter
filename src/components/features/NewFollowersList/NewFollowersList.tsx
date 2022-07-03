import { useNavigate } from 'react-router-dom';
import { useDiscover } from '../../../hooks/useDiscover';
import { useUser } from '../../../hooks/useUser';
import { Card, FollowUser, ShowMoreButton, Spinner } from '../../ui';

const USERS_TO_SHOW = 2;

export const NewFollowersList = () => {
  const { user } = useUser();
  const { loading, users } = useDiscover(USERS_TO_SHOW);
  const navigate = useNavigate();

  if (!user) return null;

  if (!loading && users.length === 0) return null;

  return loading ? (
    <div className="w-full flex items-center justify-center py-4">
      <Spinner />
    </div>
  ) : (
    <div className="mb-4">
      <Card title="Who to follow">
        <ul>
          {users.map((newUser) => (
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
