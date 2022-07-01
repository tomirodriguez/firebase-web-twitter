import { FC, PropsWithChildren } from 'react';

export const MainSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="lg:mr-7 grow border-r border-border">
      {children}
    </section>
  );
};
