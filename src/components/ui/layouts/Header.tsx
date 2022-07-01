import { FC, PropsWithChildren } from 'react';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="sticky top-0 h-screen flex flex-col shrink-0 border-r border-border justify-between w-18 md:w-20 xl:w-[275px]">
      {children}
    </header>
  );
};
