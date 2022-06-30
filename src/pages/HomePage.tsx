import { Feed, PostTweet } from '../components/features';
import { useUser } from '../hooks';

export const HomePage: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <div className="px-4 border-b border-border py-2">
        <PostTweet />
      </div>
      <Feed />
    </>
  );
};
