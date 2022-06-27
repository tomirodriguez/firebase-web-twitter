import { useContext } from 'react';
import { PostTweet } from '../../components/ui/PostTweet';
import { Feed } from '../Feed';
import { UserContext } from '../../context/UserContext';

export const HomeMainContent = () => {
  const { user } = useContext(UserContext);

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
