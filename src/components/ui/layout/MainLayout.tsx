import { ReactNode } from 'react';
import { TopBar } from '..';

type Props = {
  mainContent: ReactNode;
  aside: ReactNode;
};

export const MainLayout: React.FC<Props> = ({ mainContent, aside }) => {
  return (
    <div className="flex justify-between">
      <div className="center-size shrink-0 border-r border-border">
        <TopBar />
        {mainContent}
      </div>
      <div className="aside-size min-h-screen">{aside}</div>
    </div>
  );
};
