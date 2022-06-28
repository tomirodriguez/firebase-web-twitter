import { PostTweet } from '../components/ui';
import { useUser } from '../hooks';
import { Feed } from '../components';

export const HomeMainContent = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <div className="px-4 border-b border-border py-2">
        <PostTweet user={user} />
      </div>
      <Feed />
    </>
  );
};
