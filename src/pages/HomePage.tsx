import { SearchBar } from '../components';
import { Feed, NewFollowersList, PostTweet } from '../components/features';
import { MainLayout } from '../components/views/layout/MainLayout';
import { useUser } from '../hooks';

export const HomePage: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const aside = (
    <aside className="flex flex-col shrink-0 min-h-screen h-full">
      <SearchBar />
      <div className="mt-4">
        <NewFollowersList />
      </div>
    </aside>
  );

  const mainContent = (
    <>
      <div className="px-4 border-b border-border py-2">
        <PostTweet user={user} />
      </div>
      <Feed />
    </>
  );

  return <MainLayout mainContent={mainContent} aside={aside} />;
};
