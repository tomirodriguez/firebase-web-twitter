import { FC } from 'react';
import { SearchBar } from '../../components/ui';
import { NewFollowersList } from './NewFollowersList';

export const HomeAside: FC = () => {
  return (
    <aside className="flex flex-col shrink-0 min-h-screen h-full">
      <SearchBar />
      <div className="mt-4">
        <NewFollowersList />
      </div>
    </aside>
  );
};
