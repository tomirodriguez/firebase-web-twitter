import { ReactNode } from 'react';
import { TopBar } from '../components/ui/TopBar';

type Props = {
  mainContent: ReactNode;
  aside: ReactNode;
};

export const MainLayout: React.FC<Props> = ({ mainContent, aside }) => {
  return (
    <div className="h-screen flex">
      <div className="w-center h-screen pt-14 relative w-main-content">
        <TopBar />
        {mainContent}
      </div>
      <aside className="pl-8 pt-14 border-l border-border">{aside}</aside>
    </div>
  );
};
