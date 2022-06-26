import { FC } from 'react';
import { SearchBar } from '../../components/ui';
import { NewFollowersList } from './NewFollowersList';

export const HomeAside: FC = () => {
  return (
    <aside className="flex flex-col shrink-0 min-h-screen">
      <div className="mb-4">
        <SearchBar />
      </div>
      <NewFollowersList />
    </aside>
  );
};
