import { FC, PropsWithChildren } from 'react';

export const Aside: FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside className="lg:flex flex-col shrink-0 min-h-screen h-full hidden mxl:w-[290px] xl:w-[350px]">
      {children}
    </aside>
  );
};
