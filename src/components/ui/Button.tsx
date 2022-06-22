import React from 'react';

type Props = {
  title: string;
} & React.PropsWithChildren;

export const Button: React.FC<Props> = ({ children, title }) => {
  return (
    <button
      title={title}
      className="w-full h-full transition-opacity rounded-full font-bold text-lg bg-primary-blue hover:opacity-90"
    >
      {children}
    </button>
  );
};
