import React from 'react';

type Props = {
  title: string;
  text: string;
  disabled?: boolean;
};

export const FollowButton: React.FC<Props> = ({
  title,
  text,
  disabled = false,
}) => {
  return (
    <button
      title={title}
      type={'button'}
      className="w-18 h-8 px-2 text-sm text-follow-black bg-follow-white transition-opacity rounded-full font-bold  hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
