import { Card, FollowUser } from '../ui';

export const NewFollowersList = () => {
  return (
    <div className="mb-4">
      <ul>
        <Card title="Who to follow">{/* <FollowUser user={user} /> */}</Card>
      </ul>
    </div>
  );
};
