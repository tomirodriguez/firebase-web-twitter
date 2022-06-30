import React from 'react';

type Props = {
  title: string;
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  text,
  disabled = false,
  type = 'button',
  onClick = () => {},
}) => {
  return (
    <button
      title={title}
      type={type}
      className="w-full h-full transition-opacity rounded-full font-bold bg-primary-blue hover:opacity-90 disabled:opacity-50 appearance-none focus-visible:border-2 focus-visible:border-blue-200 outline-none"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
