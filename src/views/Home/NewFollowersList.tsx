import { Card, FollowUser } from '../../components/ui';
import { USERS } from '../../mock';

export const NewFollowersList = () => {
  return (
    <div className="mb-4">
      <ul>
        <Card title="Who to follow">
          {USERS.map((user) => (
            <li key={user.id}>
              <FollowUser user={user} />
            </li>
          ))}
        </Card>
      </ul>
    </div>
  );
};
