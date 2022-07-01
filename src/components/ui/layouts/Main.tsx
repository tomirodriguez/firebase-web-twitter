import { FC, PropsWithChildren } from 'react';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return <main className="min-h-screen w-full md:grow">{children}</main>;
};
