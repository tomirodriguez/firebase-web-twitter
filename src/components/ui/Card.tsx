import { FC, PropsWithChildren } from 'react';

type Props = {
  title?: string;
};

export const Card: FC<PropsWithChildren<Props>> = ({
  title = '',
  children,
}) => {
  return (
    <div className="bg-card-dark rounded-3xl w-full">
      {title && <h2 className="font-black text-xl py-3 px-4">{title}</h2>}
      {children}
    </div>
  );
};
