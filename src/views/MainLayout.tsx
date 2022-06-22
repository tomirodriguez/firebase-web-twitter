import { ReactNode } from 'react';

type Props = {
  mainContent: ReactNode;
  aside: ReactNode;
};

export const MainLayout: React.FC<Props> = ({ mainContent, aside }) => {
  return (
    <div className="h-screen flex">
      <div className="w-7/12 border-l border-r border-stone-700 h-screen px-4">
        {mainContent}
      </div>
      <aside className="ml-8">{aside}</aside>
    </div>
  );
};
