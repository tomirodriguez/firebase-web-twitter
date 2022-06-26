import { PostTweet } from '../components/ui/PostTweet';
import { Feed } from './Feed';

export const HomeMainContent = () => {
  return (
    <>
      <div className="px-4 border-b border-border py-4">
        <PostTweet />
      </div>
      <Feed />
    </>
  );
};
