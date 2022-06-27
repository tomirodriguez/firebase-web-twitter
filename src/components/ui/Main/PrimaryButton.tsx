import React from 'react';

type Props = {
  title: string;
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  text,
  disabled = false,
  type = 'button',
}) => {
  return (
    <button
      title={title}
      type={type}
      className="w-full h-full transition-opacity rounded-full font-bold bg-primary-blue hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
