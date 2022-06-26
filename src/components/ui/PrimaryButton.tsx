import React from 'react';

type Props = {
  title: string;
  text: string;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  text,
  disabled = false,
}) => {
  return (
    <button
      title={title}
      type={'button'}
      className="w-full h-full transition-opacity rounded-full font-bold bg-primary-blue hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
